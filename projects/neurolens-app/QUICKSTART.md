# Neuro-LENS Quick Start

## 🚀 Get Running in 10 Minutes

### Step 1: Google Drive API Setup (5 minutes)
1. Go to https://console.cloud.google.com/
2. Create project → Enable "Google Drive API"
3. Create OAuth Desktop Client credentials
4. Download as `credentials.json` → Place in `backend/` folder

### Step 2: Backend Setup (3 minutes)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
# OR: venv\Scripts\activate  # Windows

pip install -r requirements.txt
python app.py
```
→ Browser will open for Google auth
→ Sign in with kiruthika.star14@gmail.com
→ Grant Drive access

Backend running at **http://localhost:5000** ✅

### Step 3: Frontend Setup (2 minutes)
**Open new terminal** (keep backend running!)
```bash
cd frontend
npm install
npm start
```
Frontend opens at **http://localhost:3000** ✅

### Step 4: Test!
1. Upload a VCF file (get sample from 1000 Genomes)
2. Watch analysis run
3. View results with cluster scores and recommendations
4. Download PDF report

## ⚠️ Common Issues

**"credentials.json not found"**
→ Download from Google Cloud Console, place in `backend/`

**"GWAS folder not found"**  
→ Check Drive folder structure: `Biotech_Project/data/raw/gwas/`
→ Make sure folder shared with your account

**"cyvcf2 won't install"**
```bash
# Mac
brew install htslib
pip install cyvcf2

# Ubuntu
sudo apt-get install libhts-dev
pip install cyvcf2
```

**"Port already in use"**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
```

## 📁 Required Files on Google Drive

Make sure these files exist in your Drive:
```
Biotech_Project/
  └── data/
      └── raw/
          └── gwas/
              ├── ADHD.sumstats.tsv
              ├── AN.sumstats.tsv
              ├── ANX.sumstats.tsv
              ├── ASD.sumstats.tsv
              ├── AUD.sumstats.tsv
              ├── BIP.sumstats.tsv
              ├── MDD.sumstats.tsv
              ├── OCD.sumstats.tsv
              ├── PTSD.sumstats.tsv
              ├── SCZ.sumstats.tsv
              └── TS.sumstats.tsv
```

## 🎯 What Happens When You Upload

1. **PRS Calculation** - Calculates genetic risk for 11 disorders using GWAS data
2. **Cluster Transformation** - Groups into 5 factors (Grotzinger et al. 2022)
3. **Pharmacogenomics** - Analyzes CYP450 enzymes for drug metabolism
4. **Drug Matching** - Recommends medications based on genetic profile
5. **Safety Checks** - Flags dangerous drug interactions

## 📊 Results Include

- **Radar Chart** - Visual genetic risk profile
- **Cluster Scores** - 5 factor percentiles with interpretations
- **CYP Enzymes** - Metabolizer status (Poor/Normal/Rapid)
- **Medications** - Ranked recommendations with dosing
- **Safety Alerts** - Critical drug interaction warnings

## 🔒 Security

**Never commit to git:**
- ❌ `credentials.json`
- ❌ `token.pickle`
- ❌ `.vcf` files
- ❌ `.env` files

Already in `.gitignore` ✅

## 📚 Full Documentation

See `SETUP_GUIDE.md` for:
- Detailed setup instructions
- Troubleshooting guide
- Production deployment
- Architecture details

## 🧬 Sample VCF Files

Get test data:
- [1000 Genomes Project](https://www.internationalgenome.org/data)
- [Personal Genome Project](https://www.personalgenomes.org/)

## 💡 Tips

- Use Chrome/Firefox (best compatibility)
- Upload takes ~30 seconds for small VCFs
- Analysis takes 2-5 minutes depending on file size
- Reports are saved in `backend/results/`
- Backend logs show detailed progress

---

**Need Help?** Check `SETUP_GUIDE.md` troubleshooting section!
