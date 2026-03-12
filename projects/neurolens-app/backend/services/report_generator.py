"""
Report Generator
Creates comprehensive PDF reports of genomic analysis
"""

import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import logging

logger = logging.getLogger(__name__)

class ReportGenerator:
    """Generate comprehensive PDF reports"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        
        # Custom styles
        self.title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1a4d7a'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        self.heading_style = ParagraphStyle(
            'CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#2e7db5'),
            spaceAfter=12,
            spaceBefore=12
        )
        
        self.alert_style = ParagraphStyle(
            'Alert',
            parent=self.styles['Normal'],
            fontSize=11,
            textColor=colors.red,
            leftIndent=20,
            spaceAfter=10
        )
    
    def generate_pdf(self, results, analysis_id):
        """
        Generate comprehensive PDF report
        
        Args:
            results: Complete analysis results
            analysis_id: Unique analysis identifier
        
        Returns:
            str: Path to generated PDF
        """
        logger.info("Generating PDF report...")
        
        pdf_filename = f"report_{analysis_id}.pdf"
        pdf_path = os.path.join('results', pdf_filename)
        
        doc = SimpleDocTemplate(pdf_path, pagesize=letter)
        story = []
        
        # Title Page
        story.append(Paragraph("Neuro-LENS Genomic Report", self.title_style))
        story.append(Spacer(1, 0.2*inch))
        
        # Report Info
        info_data = [
            ['Analysis ID:', analysis_id],
            ['Report Date:', datetime.now().strftime('%Y-%m-%d %H:%M')],
            ['Report Type:', 'Precision Psychiatry Analysis']
        ]
        
        info_table = Table(info_data, colWidths=[2*inch, 4*inch])
        info_table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
            ('FONT', (0, 0), (0, -1), 'Helvetica-Bold', 10),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
        ]))
        
        story.append(info_table)
        story.append(Spacer(1, 0.5*inch))
        
        # Disclaimer
        disclaimer = Paragraph(
            "<i>This report is for research purposes only. It should not be used for clinical "
            "diagnosis or treatment decisions without consultation with a qualified healthcare "
            "professional. Genetic testing has limitations and results should be interpreted "
            "in context of complete clinical evaluation.</i>",
            self.styles['Normal']
        )
        story.append(disclaimer)
        story.append(PageBreak())
        
        # Cluster Scores Section
        story.append(Paragraph("5-Factor Cluster Analysis", self.heading_style))
        story.append(Spacer(1, 0.1*inch))
        
        # Create radar chart
        radar_path = self._create_radar_chart(results['cluster_scores'], analysis_id)
        if os.path.exists(radar_path):
            img = Image(radar_path, width=5*inch, height=4*inch)
            story.append(img)
            story.append(Spacer(1, 0.2*inch))
        
        # Cluster scores table
        cluster_data = [['Factor', 'Percentile', 'Interpretation']]
        
        for factor, score in results['cluster_scores'].items():
            interp = self._interpret_score(score)
            cluster_data.append([factor, f"{score}%", interp])
        
        cluster_table = Table(cluster_data, colWidths=[2*inch, 1.5*inch, 3*inch])
        cluster_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2e7db5')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 11),
            ('FONT', (0, 1), (-1, -1), 'Helvetica', 10),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fafc')])
        ]))
        
        story.append(cluster_table)
        story.append(PageBreak())
        
        # Pharmacogenomics Section
        story.append(Paragraph("Pharmacogenomic Analysis", self.heading_style))
        story.append(Spacer(1, 0.1*inch))
        
        pharmaco_data = [['Enzyme', 'Phenotype', 'Clinical Significance']]
        
        for enzyme, data in results['pharmacogenomics'].items():
            pharmaco_data.append([
                enzyme,
                data['phenotype'],
                data['clinical_significance']
            ])
        
        pharmaco_table = Table(pharmaco_data, colWidths=[1.5*inch, 2*inch, 3*inch])
        pharmaco_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#7c3aed')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 11),
            ('FONT', (0, 1), (-1, -1), 'Helvetica', 10),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f3e8ff')])
        ]))
        
        story.append(pharmaco_table)
        story.append(Spacer(1, 0.3*inch))
        
        # Safety Alerts
        if results.get('safety_alerts'):
            story.append(Paragraph("⚠️ Safety Alerts", self.heading_style))
            story.append(Spacer(1, 0.1*inch))
            
            for alert in results['safety_alerts']:
                alert_text = f"<b>{alert['title']}</b><br/>"
                alert_text += f"{alert['description']}<br/>"
                alert_text += f"<i>Recommendation: {alert['recommendation']}</i>"
                
                story.append(Paragraph(alert_text, self.alert_style))
                story.append(Spacer(1, 0.2*inch))
        
        story.append(PageBreak())
        
        # Medication Recommendations
        story.append(Paragraph("Medication Recommendations", self.heading_style))
        story.append(Spacer(1, 0.1*inch))
        
        if results['recommendations']['primary']:
            for rec in results['recommendations']['primary'][:5]:  # Top 5
                med_text = f"<b>{rec['name']}</b> ({rec['class']})<br/>"
                med_text += f"Dose Range: {rec['dose_range']}<br/>"
                med_text += f"Target Cluster: {rec['cluster']} (Score: {rec['priority']:.1f}%)"
                
                story.append(Paragraph(med_text, self.styles['Normal']))
                
                # CYP adjustments
                if rec.get('cyp_adjustments'):
                    for adj in rec['cyp_adjustments']:
                        if adj['severity'] in ['high', 'moderate']:
                            adj_text = f"• {adj['recommendation']}"
                            story.append(Paragraph(adj_text, self.styles['Normal']))
                
                story.append(Spacer(1, 0.2*inch))
        
        # Build PDF
        doc.build(story)
        
        logger.info(f"PDF report generated: {pdf_path}")
        
        return pdf_path
    
    def _create_radar_chart(self, cluster_scores, analysis_id):
        """Create radar chart visualization of cluster scores"""
        try:
            factors = list(cluster_scores.keys())
            scores = list(cluster_scores.values())
            
            # Number of variables
            num_vars = len(factors)
            
            # Compute angle for each axis
            angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()
            
            # Complete the circle
            scores += scores[:1]
            angles += angles[:1]
            
            # Plot
            fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(projection='polar'))
            
            ax.plot(angles, scores, 'o-', linewidth=2, color='#2e7db5')
            ax.fill(angles, scores, alpha=0.25, color='#2e7db5')
            
            ax.set_xticks(angles[:-1])
            ax.set_xticklabels(factors, size=10)
            
            ax.set_ylim(0, 100)
            ax.set_yticks([25, 50, 75, 100])
            ax.set_yticklabels(['25', '50', '75', '100'], size=8)
            
            ax.set_title('Genetic Risk Profile', size=14, pad=20, weight='bold')
            
            ax.grid(True, linestyle='--', alpha=0.7)
            
            # Save
            chart_path = os.path.join('results', f'radar_{analysis_id}.png')
            plt.tight_layout()
            plt.savefig(chart_path, dpi=150, bbox_inches='tight')
            plt.close()
            
            return chart_path
        
        except Exception as e:
            logger.error(f"Error creating radar chart: {e}")
            return None
    
    def _interpret_score(self, score):
        """Interpret percentile score"""
        if score < 25:
            return "Low genetic risk"
        elif score < 75:
            return "Average genetic risk"
        elif score < 90:
            return "Elevated genetic risk"
        else:
            return "High genetic risk"
