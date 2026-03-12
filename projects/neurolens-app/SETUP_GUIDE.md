# Neuro-LENS Setup Guide

## Complete Installation Instructions

### Prerequisites
- **Python 3.9+** installed
- **Node.js 18+** and npm installed
- **Google account** with access to your GWAS data files
- **Git** (optional, for version control)

## Part 1: Google Drive API Setup (Required First!)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select existing project
3. Name it "Neuro-LENS-API" (or any name)
4. Click "Create"

### Step 2: Enable Google Drive API
1. In the Cloud Console, go to **APIs & Services > Library**
2. Search for "Google Drive API"
3. Click on it and press **"Enable"**

### Step 3: Create OAuth 2.0 Credentials
1. Go to **APIs & Services > Credentials**
2. Click **"Create Credentials" > "OAuth client ID"**
3. If prompted, configure OAuth consent screen:
   - Choose "External" user type
   - App name: "Neuro-LENS"
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue" through all steps
4. Back to Create OAuth client ID:
   - Application type: **"Desktop app"**
   - Name: "Neuro-LENS Desktop Client"
   - Click "Create"
5. **Download credentials**:
   - Click the download icon (⬇️) next to your newly created OAuth client
   - Save as `credentials.json`

### Step 4: Place Credentials File
```bash
# Move credentials.json to backend directory
mv ~/Downloads/credentials.json /path/to/neurolens-app/backend/credentials.json
```

## Part 2: Backend Setup

### Navigate to Backend Directory
```bash
cd neurolens-app/backend
```

### Create Python Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Important: Install Bioinformatics Tools
```bash
# Install cyvcf2 (may need system libraries)
# On Mac:
brew install htslib
pip install cyvcf2

# On Ubuntu/Debian:
sudo apt-get install libhts-dev
pip install cyvcf2

# On Windows:
# Use WSL or conda
conda install -c bioconda cyvcf2
```

### Create Required Directories
```bash
mkdir -p uploads results
```

### First-Time Authentication
```bash
# Run the app for the first time
python app.py
```

**This will:**
1. Open a browser window for Google OAuth
2. Ask you to sign in to your Google account (kiruthika.star14@gmail.com)
3. Grant permissions to access Google Drive
4. Save a `token.pickle` file for future use

**Grant these permissions:**
- ✅ See and download all your Google Drive files
- This is read-only access - the app cannot modify/delete files

### Verify GWAS Data Access
After authentication, test the connection:
```bash
# In Python shell
python
>>> from services.google_drive_service import GoogleDriveService
>>> service = GoogleDriveService()
>>> status = service.check_gwas_files()
>>> print(status)
# Should show all .tsv files as available
```

### Start Backend Server
```bash
python app.py
```

Backend should now be running on **http://localhost:5000**

## Part 3: Frontend Setup

### Open New Terminal (keep backend running!)

### Navigate to Frontend Directory
```bash
cd neurolens-app/frontend
```

### Install Node Dependencies
```bash
npm install
```

If you encounter errors, try:
```bash
npm install --legacy-peer-deps
```

### Start Development Server
```bash
npm start
```

Frontend should automatically open at **http://localhost:3000**

## Part 4: Verify Everything Works

### Test 1: Check Backend Health
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"healthy",...}`

### Test 2: Check GWAS Data
```bash
curl http://localhost:5000/api/gwas-data-status
```
Should show all 11 GWAS files as available

### Test 3: Upload Sample VCF
1. Download a sample VCF from [1000 Genomes](https://www.internationalgenome.org/data)
2. Use the web interface to upload
3. Monitor backend terminal for processing logs

## Part 5: Troubleshooting

### Issue: "credentials.json not found"
**Solution:**
- Make sure `credentials.json` is in the `backend/` directory
- File must be named exactly `credentials.json`
- Re-download from Google Cloud Console if needed

### Issue: "GWAS folder not found"
**Solution:**
- Verify your Google Drive folder structure:
  ```
  Biotech_Project/
    └── data/
        └── raw/
            └── gwas/
                ├── ADHD.sumstats.tsv
                ├── AN.sumstats.tsv
                └── ... (all 11 files)
  ```
- Make sure folder is shared with your Google account
- Try logging in with correct account (kiruthika.star14@gmail.com)

### Issue: "cyvcf2 installation failed"
**Solution:**
```bash
# Mac
brew install htslib
pip install cyvcf2

# Ubuntu
sudo apt-get install libhts-dev zlib1g-dev libbz2-dev liblzma-dev
pip install cyvcf2

# Or use conda:
conda install -c bioconda cyvcf2
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill process using port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in app.py:
# app.run(debug=True, port=5001)
```

### Issue: "CORS errors in browser"
**Solution:**
- Backend must be running on http://localhost:5000
- Frontend must be running on http://localhost:3000
- CORS is enabled in Flask app (already configured)

### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Install with legacy peer deps
npm install --legacy-peer-deps
```

## Part 6: Production Deployment

### Backend (Python/Flask)
```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend (React)
```bash
# Build production bundle
npm run build

# Serve with static server
npm install -g serve
serve -s build -p 3000
```

### Environment Variables
Create `.env` file in backend/:
```
FLASK_ENV=production
GOOGLE_DRIVE_FOLDER_ID=<your-folder-id>
MAX_UPLOAD_SIZE=524288000
```

## Part 7: Using the Application

### Upload VCF
1. Go to http://localhost:3000
2. Click "Upload VCF File" or drag and drop
3. Supported formats: `.vcf`, `.vcf.gz`
4. Max size: 500MB

### Analysis Pipeline
The application automatically:
1. ✅ Validates VCF format
2. ✅ Calculates 14 PRS scores (using GWAS data from Drive)
3. ✅ Transforms to 5 cluster scores
4. ✅ Analyzes CYP450 variants
5. ✅ Generates medication recommendations
6. ✅ Performs 3 safety checks

### Download Report
- Click "Download PDF Report" to get comprehensive analysis
- Report includes:
  - Radar chart of cluster scores
  - Pharmacogenomic table
  - Medication recommendations
  - Safety alerts

## Next Steps

### Add More Features
- Integrate PharmCAT for full star allele calling
- Add PRSice-2 for advanced PRS calculation
- Implement user authentication
- Add report sharing functionality

### Deploy to Cloud
- AWS: Use Elastic Beanstalk (Flask) + S3 (React)
- Google Cloud: App Engine (Flask) + Cloud Storage (React)
- Heroku: Easy deployment for both frontend and backend

### Validate with Real Data
- Test with 1000 Genomes VCF files
- Compare PRS results with published scores
- Validate pharmacogenomic predictions

## Support
For issues or questions:
1. Check troubleshooting section above
2. Review backend logs: `tail -f backend.log`
3. Check browser console for frontend errors
4. Verify Google Drive API quotas haven't been exceeded

## Security Notes
⚠️ **Important:**
- Never commit `credentials.json` to git
- Never commit `token.pickle` to git  
- Add both to `.gitignore`
- Use environment variables for production
- Implement proper authentication before deploying publicly
- This is for research use - not HIPAA compliant in current form

## File Structure
```
neurolens-app/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── credentials.json       # Google OAuth (do not commit!)
│   ├── token.pickle          # Auth token (do not commit!)
│   ├── uploads/              # Uploaded VCF files
│   ├── results/              # Analysis results
│   └── services/
│       ├── google_drive_service.py
│       ├── prs_calculator.py
│       ├── cluster_engine.py
│       ├── pharmacogenomics.py
│       ├── drug_resolver.py
│       └── report_generator.py
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.tsx
        ├── App.css
        ├── index.tsx
        └── components/
            ├── RadarChart.tsx
            ├── ClusterScores.tsx
            ├── SafetyAlerts.tsx
            ├── MedicationCard.tsx
            └── PharmacogenomicsTable.tsx
```

---

**🎉 You're all set! Happy analyzing!**
