"""
Google Drive Service
Handles authentication and file retrieval from Google Drive
"""

import os
import io
import pickle
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import pandas as pd
import logging

logger = logging.getLogger(__name__)

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

class GoogleDriveService:
    """Service for accessing GWAS data files from Google Drive"""
    
    def __init__(self):
        self.service = None
        self.gwas_folder_id = None
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate with Google Drive API"""
        creds = None
        
        # Token file stores user's access and refresh tokens
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        
        # If no valid credentials available, let user log in
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not os.path.exists('credentials.json'):
                    logger.error("credentials.json not found!")
                    raise FileNotFoundError(
                        "Please place credentials.json in backend/ directory"
                    )
                
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            
            # Save credentials for next run
            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)
        
        self.service = build('drive', 'v3', credentials=creds)
        logger.info("Successfully authenticated with Google Drive")
    
    def find_gwas_folder(self):
        """Find the GWAS data folder in Google Drive"""
        try:
            # Search for Biotech_Project/data/raw/gwas folder
            query = "name='gwas' and mimeType='application/vnd.google-apps.folder'"
            
            results = self.service.files().list(
                q=query,
                spaces='drive',
                fields='files(id, name, parents)'
            ).execute()
            
            files = results.get('files', [])
            
            if not files:
                logger.error("GWAS folder not found")
                return None
            
            # Store folder ID
            self.gwas_folder_id = files[0]['id']
            logger.info(f"Found GWAS folder: {self.gwas_folder_id}")
            return self.gwas_folder_id
        
        except Exception as e:
            logger.error(f"Error finding GWAS folder: {e}")
            return None
    
    def list_gwas_files(self):
        """List all GWAS summary statistics files"""
        if not self.gwas_folder_id:
            self.find_gwas_folder()
        
        if not self.gwas_folder_id:
            return []
        
        try:
            query = f"'{self.gwas_folder_id}' in parents and trashed=false"
            
            results = self.service.files().list(
                q=query,
                fields='files(id, name, size, modifiedTime)'
            ).execute()
            
            files = results.get('files', [])
            logger.info(f"Found {len(files)} GWAS files")
            
            return files
        
        except Exception as e:
            logger.error(f"Error listing files: {e}")
            return []
    
    def download_gwas_file(self, filename):
        """Download GWAS file by name and return as DataFrame"""
        try:
            # Find file
            files = self.list_gwas_files()
            file_id = None
            
            for f in files:
                if f['name'] == filename:
                    file_id = f['id']
                    break
            
            if not file_id:
                logger.error(f"File {filename} not found")
                return None
            
            # Download file
            request = self.service.files().get_media(fileId=file_id)
            file_data = io.BytesIO()
            downloader = MediaIoBaseDownload(file_data, request)
            
            done = False
            while not done:
                status, done = downloader.next_chunk()
                if status:
                    logger.info(f"Download {int(status.progress() * 100)}%")
            
            # Read into pandas DataFrame
            file_data.seek(0)
            df = pd.read_csv(file_data, sep='\t')
            logger.info(f"Loaded {filename}: {len(df)} variants")
            
            return df
        
        except Exception as e:
            logger.error(f"Error downloading {filename}: {e}")
            return None
    
    def check_gwas_files(self):
        """Check status of all expected GWAS files"""
        expected_files = [
            'ADHD.sumstats.tsv',
            'AN.sumstats.tsv',
            'ANX.sumstats.tsv',
            'ASD.sumstats.tsv',
            'AUD.sumstats.tsv',
            'BIP.sumstats.tsv',
            'MDD.sumstats.tsv',
            'OCD.sumstats.tsv',
            'PTSD.sumstats.tsv',
            'SCZ.sumstats.tsv',
            'TS.sumstats.tsv'
        ]
        
        available_files = self.list_gwas_files()
        available_names = [f['name'] for f in available_files]
        
        status = {
            'connected': bool(self.service),
            'gwas_folder_found': bool(self.gwas_folder_id),
            'total_files': len(available_files),
            'files': {}
        }
        
        for expected in expected_files:
            status['files'][expected] = expected in available_names
        
        return status
    
    def get_all_gwas_data(self):
        """Download all GWAS files and return as dictionary"""
        disorder_mapping = {
            'ADHD.sumstats.tsv': 'ADHD',
            'AN.sumstats.tsv': 'Anorexia',
            'ANX.sumstats.tsv': 'Anxiety',
            'ASD.sumstats.tsv': 'Autism',
            'AUD.sumstats.tsv': 'Alcohol_Use',
            'BIP.sumstats.tsv': 'Bipolar',
            'MDD.sumstats.tsv': 'Depression',
            'OCD.sumstats.tsv': 'OCD',
            'PTSD.sumstats.tsv': 'PTSD',
            'SCZ.sumstats.tsv': 'Schizophrenia',
            'TS.sumstats.tsv': 'Tourettes'
        }
        
        gwas_data = {}
        
        for filename, disorder in disorder_mapping.items():
            logger.info(f"Downloading {disorder} data...")
            df = self.download_gwas_file(filename)
            
            if df is not None:
                gwas_data[disorder] = df
            else:
                logger.warning(f"Failed to download {disorder} data")
        
        return gwas_data
