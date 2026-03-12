"""
Neuro-LENS Backend API
Main Flask application for genomic analysis and drug recommendations
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
from datetime import datetime
from werkzeug.utils import secure_filename
import logging

# Import custom services
from services.google_drive_service import GoogleDriveService
from services.prs_calculator import PRSCalculator
from services.cluster_engine import ClusterEngine
from services.pharmacogenomics import PharmacogenomicsAnalyzer
from services.drug_resolver import DrugResolver
from services.report_generator import ReportGenerator

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
ALLOWED_EXTENSIONS = {'vcf', 'vcf.gz'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024  # 500MB max file size

# Initialize services
drive_service = GoogleDriveService()
prs_calculator = PRSCalculator(drive_service)
cluster_engine = ClusterEngine()
pharmaco_analyzer = PharmacogenomicsAnalyzer()
drug_resolver = DrugResolver()
report_generator = ReportGenerator()


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS or \
           filename.endswith('.vcf.gz')


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })


@app.route('/api/upload-vcf', methods=['POST'])
def upload_vcf():
    """
    Upload and validate VCF file
    Returns analysis ID for tracking
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Please upload VCF file'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        analysis_id = f"{timestamp}_{filename.replace('.', '_')}"
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], f"{analysis_id}.vcf")
        file.save(filepath)
        
        # Validate VCF format
        if not _validate_vcf(filepath):
            os.remove(filepath)
            return jsonify({'error': 'Invalid VCF file format'}), 400
        
        logger.info(f"VCF uploaded successfully: {analysis_id}")
        
        return jsonify({
            'success': True,
            'analysis_id': analysis_id,
            'filename': filename,
            'message': 'VCF file uploaded successfully'
        })
    
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500


@app.route('/api/analyze/<analysis_id>', methods=['POST'])
def analyze_genome(analysis_id):
    """
    Main analysis pipeline
    1. Calculate 14 PRS scores
    2. Transform to 5 cluster scores
    3. Perform pharmacogenomic analysis
    4. Generate drug recommendations
    """
    try:
        vcf_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{analysis_id}.vcf")
        
        if not os.path.exists(vcf_path):
            return jsonify({'error': 'Analysis ID not found'}), 404
        
        logger.info(f"Starting analysis for {analysis_id}")
        
        # Step 1: Calculate PRS scores (using GWAS data from Google Drive)
        logger.info("Calculating polygenic risk scores...")
        prs_scores = prs_calculator.calculate_all_scores(vcf_path)
        
        # Step 2: Transform to 5 clusters
        logger.info("Computing cluster factors...")
        cluster_scores = cluster_engine.transform_to_clusters(prs_scores)
        
        # Step 3: Pharmacogenomic analysis
        logger.info("Analyzing pharmacogenomic variants...")
        pharmaco_results = pharmaco_analyzer.analyze_vcf(vcf_path)
        
        # Step 4: Generate drug recommendations
        logger.info("Generating medication recommendations...")
        drug_recommendations = drug_resolver.resolve_medications(
            cluster_scores,
            pharmaco_results
        )
        
        # Compile results
        results = {
            'analysis_id': analysis_id,
            'timestamp': datetime.now().isoformat(),
            'prs_scores': prs_scores,
            'cluster_scores': cluster_scores,
            'pharmacogenomics': pharmaco_results,
            'recommendations': drug_recommendations,
            'safety_alerts': drug_resolver.get_safety_alerts(
                drug_recommendations,
                pharmaco_results
            )
        }
        
        # Save results
        results_path = os.path.join(RESULTS_FOLDER, f"{analysis_id}_results.json")
        with open(results_path, 'w') as f:
            json.dump(results, f, indent=2)
        
        logger.info(f"Analysis completed for {analysis_id}")
        
        return jsonify({
            'success': True,
            'results': results
        })
    
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500


@app.route('/api/results/<analysis_id>', methods=['GET'])
def get_results(analysis_id):
    """Retrieve analysis results"""
    try:
        results_path = os.path.join(RESULTS_FOLDER, f"{analysis_id}_results.json")
        
        if not os.path.exists(results_path):
            return jsonify({'error': 'Results not found'}), 404
        
        with open(results_path, 'r') as f:
            results = json.load(f)
        
        return jsonify(results)
    
    except Exception as e:
        logger.error(f"Error retrieving results: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/report/<analysis_id>', methods=['GET'])
def generate_report(analysis_id):
    """Generate PDF report"""
    try:
        results_path = os.path.join(RESULTS_FOLDER, f"{analysis_id}_results.json")
        
        if not os.path.exists(results_path):
            return jsonify({'error': 'Results not found'}), 404
        
        with open(results_path, 'r') as f:
            results = json.load(f)
        
        # Generate PDF
        pdf_path = report_generator.generate_pdf(results, analysis_id)
        
        return send_file(
            pdf_path,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'neuro_lens_report_{analysis_id}.pdf'
        )
    
    except Exception as e:
        logger.error(f"Report generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/gwas-data-status', methods=['GET'])
def gwas_data_status():
    """Check status of GWAS data from Google Drive"""
    try:
        status = drive_service.check_gwas_files()
        return jsonify(status)
    except Exception as e:
        logger.error(f"GWAS status check error: {str(e)}")
        return jsonify({'error': str(e)}), 500


def _validate_vcf(filepath):
    """Basic VCF validation"""
    try:
        with open(filepath, 'r') as f:
            first_line = f.readline()
            return first_line.startswith('##fileformat=VCF')
    except:
        return False


@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({'error': 'File too large. Maximum size is 500MB'}), 413


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    print("\n" + "="*60)
    print("🧬 Neuro-LENS Backend Server")
    print("="*60)
    print("Server starting on http://localhost:5000")
    print("Make sure to:")
    print("  1. Place credentials.json in backend/ directory")
    print("  2. Configure Google Drive access")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
