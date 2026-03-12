"""
Polygenic Risk Score Calculator
Calculates 14 psychiatric disorder risk scores from VCF data
"""

import numpy as np
import pandas as pd
from cyvcf2 import VCF
import logging

logger = logging.getLogger(__name__)

class PRSCalculator:
    """Calculate polygenic risk scores using GWAS summary statistics"""
    
    def __init__(self, drive_service):
        self.drive_service = drive_service
        self.gwas_data = None
        self.disorders = [
            'ADHD', 'Depression', 'Bipolar', 'Schizophrenia',
            'Autism', 'OCD', 'Anorexia', 'PTSD',
            'Tourettes', 'Anxiety', 'Alcohol_Use'
        ]
    
    def load_gwas_data(self):
        """Load all GWAS summary statistics from Google Drive"""
        if self.gwas_data is None:
            logger.info("Loading GWAS data from Google Drive...")
            self.gwas_data = self.drive_service.get_all_gwas_data()
            logger.info(f"Loaded {len(self.gwas_data)} GWAS datasets")
        return self.gwas_data
    
    def calculate_prs_for_disorder(self, vcf_path, disorder, gwas_df):
        """
        Calculate PRS for a single disorder
        
        Args:
            vcf_path: Path to patient VCF file
            disorder: Disorder name
            gwas_df: GWAS summary statistics DataFrame
        
        Returns:
            float: Polygenic risk score
        """
        try:
            # Read VCF
            vcf = VCF(vcf_path)
            
            # Expected GWAS columns (adjust based on your data format)
            # Common format: CHR, POS, SNP, A1, A2, BETA, P
            if 'SNP' not in gwas_df.columns:
                logger.warning(f"No SNP column in {disorder} data")
                return 0.0
            
            # Filter GWAS for significant SNPs (p < 5e-8 or use p-threshold)
            p_threshold = 1e-5  # Adjust based on dataset
            if 'P' in gwas_df.columns:
                gwas_significant = gwas_df[gwas_df['P'] < p_threshold].copy()
            else:
                gwas_significant = gwas_df.copy()
            
            logger.info(f"{disorder}: {len(gwas_significant)} significant SNPs")
            
            # Calculate weighted sum
            prs = 0.0
            matched_snps = 0
            
            # Create SNP lookup
            snp_lookup = {}
            for _, row in gwas_significant.iterrows():
                snp_id = row.get('SNP', row.get('rsid', None))
                if snp_id:
                    snp_lookup[snp_id] = {
                        'beta': row.get('BETA', row.get('beta', 0)),
                        'a1': row.get('A1', row.get('effect_allele', None))
                    }
            
            # Match with VCF variants
            for variant in vcf:
                snp_id = variant.ID
                
                if snp_id and snp_id in snp_lookup:
                    snp_data = snp_lookup[snp_id]
                    beta = snp_data['beta']
                    
                    # Get genotype (simplified - count effect alleles)
                    # In real implementation, check allele matching
                    genotype = variant.gt_types[0]  # For first sample
                    
                    # genotype: 0=hom_ref, 1=het, 2=hom_alt, 3=unknown
                    if genotype in [1, 2]:  # Has effect allele
                        allele_count = genotype  # Simplified
                        prs += beta * allele_count
                        matched_snps += 1
            
            logger.info(f"{disorder}: Matched {matched_snps} SNPs, PRS = {prs:.4f}")
            
            return prs
        
        except Exception as e:
            logger.error(f"Error calculating PRS for {disorder}: {e}")
            return 0.0
    
    def calculate_all_scores(self, vcf_path):
        """
        Calculate all 14 polygenic risk scores
        
        Returns:
            dict: Disorder -> PRS score mapping
        """
        # Load GWAS data
        self.load_gwas_data()
        
        prs_scores = {}
        
        for disorder in self.disorders:
            if disorder in self.gwas_data:
                logger.info(f"Calculating PRS for {disorder}...")
                gwas_df = self.gwas_data[disorder]
                score = self.calculate_prs_for_disorder(vcf_path, disorder, gwas_df)
                prs_scores[disorder] = score
            else:
                logger.warning(f"No GWAS data for {disorder}")
                prs_scores[disorder] = 0.0
        
        # Normalize scores to percentiles (simplified)
        # In production, use reference population distributions
        prs_scores = self._convert_to_percentiles(prs_scores)
        
        return prs_scores
    
    def _convert_to_percentiles(self, prs_scores):
        """
        Convert raw PRS to percentiles
        In production, use 1000 Genomes population distribution
        For now, using simulated normalization
        """
        # Simulated population mean and SD for each disorder
        # These should be replaced with real population statistics
        population_stats = {
            'ADHD': {'mean': 0.0, 'sd': 1.0},
            'Depression': {'mean': 0.0, 'sd': 1.0},
            'Bipolar': {'mean': 0.0, 'sd': 1.0},
            'Schizophrenia': {'mean': 0.0, 'sd': 1.0},
            'Autism': {'mean': 0.0, 'sd': 1.0},
            'OCD': {'mean': 0.0, 'sd': 1.0},
            'Anorexia': {'mean': 0.0, 'sd': 1.0},
            'PTSD': {'mean': 0.0, 'sd': 1.0},
            'Tourettes': {'mean': 0.0, 'sd': 1.0},
            'Anxiety': {'mean': 0.0, 'sd': 1.0},
            'Alcohol_Use': {'mean': 0.0, 'sd': 1.0}
        }
        
        percentile_scores = {}
        
        for disorder, raw_score in prs_scores.items():
            if disorder in population_stats:
                stats = population_stats[disorder]
                
                # Z-score
                z_score = (raw_score - stats['mean']) / stats['sd']
                
                # Convert to percentile (0-100)
                from scipy.stats import norm
                percentile = norm.cdf(z_score) * 100
                
                percentile_scores[disorder] = round(percentile, 1)
            else:
                percentile_scores[disorder] = 50.0  # Default to median
        
        return percentile_scores
    
    def validate_vcf(self, vcf_path):
        """Validate VCF file format and content"""
        try:
            vcf = VCF(vcf_path)
            
            # Check if has variants
            variant_count = 0
            for _ in vcf:
                variant_count += 1
                if variant_count > 100:  # Just check first 100
                    break
            
            if variant_count == 0:
                return False, "No variants found in VCF"
            
            return True, f"Valid VCF with variants"
        
        except Exception as e:
            return False, f"VCF validation error: {str(e)}"
