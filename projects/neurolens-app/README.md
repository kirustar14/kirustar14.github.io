# Neuro-LENS - Precision Psychiatry Platform

## Overview
Neuro-LENS integrates polygenic risk scores with pharmacogenomic analysis to provide personalized psychiatric medication recommendations based on genetic architecture.

## Project Structure
```
neurolens-app/
├── frontend/          # React TypeScript application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Python Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── services/
└── README.md
```

## Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Google Drive API credentials
- Git

## Setup Instructions

### 1. Google Drive API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Drive API
4. Create credentials (OAuth 2.0 Client ID)
5. Download credentials as `credentials.json`
6. Place in `backend/` directory

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## Features
- ✅ VCF file upload and processing
- ✅ 14 polygenic risk score calculations
- ✅ 5-factor cluster analysis (Grotzinger et al. 2022)
- ✅ Pharmacogenomic analysis (CYP enzymes)
- ✅ Drug interaction safety checks
- ✅ Interactive visualization dashboard
- ✅ PDF report generation

## Data Sources
- GWAS summary statistics from Google Drive
- 1000 Genomes Project reference data
- PharmCAT pharmacogenomic database
- CPIC clinical guidelines

## Technology Stack
- **Frontend**: React, TypeScript, Chart.js, TailwindCSS
- **Backend**: Python, Flask, Pandas, NumPy
- **Bioinformatics**: PRSice-2, PharmCAT
- **APIs**: Google Drive API

## Development Roadmap
- [x] Week 1: Data pipeline and PRSice-2 integration
- [x] Week 2: 5-Factor cluster engine
- [x] Week 3: Pharmacogenomic resolver
- [x] Week 4: Full-stack MVP with UI

## License
For research use only. Not for clinical diagnosis.

## Contact
Built on peer-reviewed research from Nature Genetics 2022.
