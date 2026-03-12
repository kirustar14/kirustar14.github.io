import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import RadarChart from './components/RadarChart';
import SafetyAlerts from './components/SafetyAlerts';
import MedicationCard from './components/MedicationCard';
import ClusterScores from './components/ClusterScores';
import PharmacogenomicsTable from './components/PharmacogenomicsTable';

const API_URL = 'http://localhost:5000/api';

interface AnalysisResults {
  analysis_id: string;
  cluster_scores: Record<string, number>;
  pharmacogenomics: Record<string, any>;
  recommendations: {
    primary: any[];
    combination: any[];
  };
  safety_alerts: any[];
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a VCF file');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload-vcf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisId(response.data.analysis_id);
      setUploading(false);
      
      // Automatically start analysis
      handleAnalyze(response.data.analysis_id);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed');
      setUploading(false);
    }
  };

  const handleAnalyze = async (id: string) => {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/analyze/${id}`);
      setResults(response.data.results);
      setAnalyzing(false);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Analysis failed');
      setAnalyzing(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!analysisId) return;

    try {
      const response = await axios.get(`${API_URL}/report/${analysisId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `neuro_lens_report_${analysisId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download report');
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisId(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">NL</div>
            <span>Neuro-LENS</span>
          </div>
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#science">Science</a>
            <a href="#safety">Safety</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Precision Psychiatry<br/>Meets Pharmacogenomics</h1>
          <p className="hero-subtitle">
            Transform genomic data into actionable psychiatric treatment plans
          </p>
          <p className="hero-description">
            Neuro-LENS integrates polygenic risk scores with pharmacogenomic analysis 
            to provide personalized medication recommendations based on your patient's 
            unique genetic architecture.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Upload Section */}
        {!results && (
          <section className="upload-section">
            <div className="section-header">
              <span className="section-tag">START ANALYSIS</span>
              <h2>Upload Patient VCF File</h2>
              <p className="section-description">
                Upload a VCF file from whole genome sequencing to begin analysis
              </p>
            </div>

            <div className="upload-card">
              <div className="upload-area">
                <input
                  type="file"
                  id="vcf-upload"
                  accept=".vcf,.vcf.gz"
                  onChange={handleFileChange}
                  disabled={uploading || analyzing}
                />
                <label htmlFor="vcf-upload" className="upload-label">
                  {file ? (
                    <>
                      <span className="file-icon">📄</span>
                      <span>{file.name}</span>
                      <span className="file-size">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="upload-icon">⬆️</span>
                      <span>Click to upload or drag and drop</span>
                      <span className="upload-hint">VCF or VCF.GZ (max 500MB)</span>
                    </>
                  )}
                </label>
              </div>

              <button
                className="btn-primary btn-large"
                onClick={handleUpload}
                disabled={!file || uploading || analyzing}
              >
                {uploading ? 'Uploading...' : analyzing ? 'Analyzing...' : 'Analyze Genome'}
              </button>

              {error && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {analyzing && (
                <div className="analyzing-status">
                  <div className="spinner"></div>
                  <div className="status-text">
                    <p><strong>Running Analysis Pipeline...</strong></p>
                    <p>⚙️ Calculating polygenic risk scores</p>
                    <p>🧬 Transforming to cluster factors</p>
                    <p>💊 Analyzing pharmacogenomic variants</p>
                    <p>🔍 Generating recommendations</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Results Section */}
        {results && (
          <>
            <section className="results-header">
              <div className="results-title">
                <h2>Genomic Analysis Complete</h2>
                <p>Analysis ID: {analysisId}</p>
              </div>
              <div className="results-actions">
                <button className="btn-outline" onClick={handleDownloadReport}>
                  📥 Download PDF Report
                </button>
                <button className="btn-outline" onClick={handleReset}>
                  🔄 New Analysis
                </button>
              </div>
            </section>

            {/* Safety Alerts */}
            {results.safety_alerts && results.safety_alerts.length > 0 && (
              <section className="section">
                <SafetyAlerts alerts={results.safety_alerts} />
              </section>
            )}

            {/* Cluster Scores */}
            <section className="section">
              <div className="section-header">
                <span className="section-tag">GENETIC PROFILE</span>
                <h2>5-Factor Neuro-Signature</h2>
                <p className="section-description">
                  Polygenic risk scores clustered into 5 biologically meaningful dimensions
                </p>
              </div>
              
              <div className="results-grid">
                <div className="chart-container">
                  <RadarChart clusterScores={results.cluster_scores} />
                </div>
                <div className="scores-container">
                  <ClusterScores clusterScores={results.cluster_scores} />
                </div>
              </div>
            </section>

            {/* Pharmacogenomics */}
            <section className="section">
              <div className="section-header">
                <span className="section-tag">DRUG METABOLISM</span>
                <h2>Pharmacogenomic Profile</h2>
                <p className="section-description">
                  CYP450 enzyme metabolizer status
                </p>
              </div>
              <PharmacogenomicsTable data={results.pharmacogenomics} />
            </section>

            {/* Medication Recommendations */}
            <section className="section">
              <div className="section-header">
                <span className="section-tag">TREATMENT GUIDANCE</span>
                <h2>Medication Recommendations</h2>
                <p className="section-description">
                  Personalized suggestions based on genetic profile
                </p>
              </div>
              
              <div className="medication-grid">
                {results.recommendations.primary.slice(0, 6).map((med, idx) => (
                  <MedicationCard key={idx} medication={med} rank={idx + 1} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h5>Neuro-LENS</h5>
            <p>Precision psychiatry platform integrating genomics and pharmacology</p>
          </div>
          <div className="footer-section">
            <h5>Science</h5>
            <p>Built on Grotzinger et al. (Nature Genetics, 2022)</p>
            <p>PharmCAT & CPIC Guidelines</p>
          </div>
          <div className="footer-section">
            <h5>Disclaimer</h5>
            <p>For research use only. Not for clinical diagnosis.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Neuro-LENS. HIPAA compliant. Peer-reviewed science.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
