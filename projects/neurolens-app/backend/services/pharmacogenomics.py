"""
Pharmacogenomics Analyzer
Analyzes CYP450 enzyme variants for drug metabolism prediction
"""

import logging
from cyvcf2 import VCF

logger = logging.getLogger(__name__)

class PharmacogenomicsAnalyzer:
    """Analyze pharmacogenomic variants for drug metabolism"""
    
    def __init__(self):
        # CYP450 enzyme star allele definitions
        # Simplified version - full implementation would use PharmCAT
        
        self.cyp_variants = {
            'CYP2D6': {
                'chr': '22',
                'gene_region': (42522500, 42526883),
                'star_alleles': {
                    '*1': {'phenotype': 'Normal Metabolizer', 'variants': []},
                    '*2': {'phenotype': 'Normal Metabolizer', 'variants': ['rs16947']},
                    '*3': {'phenotype': 'Poor Metabolizer', 'variants': ['rs35742686']},
                    '*4': {'phenotype': 'Poor Metabolizer', 'variants': ['rs3892097']},
                    '*5': {'phenotype': 'Poor Metabolizer', 'variants': ['deletion']},
                    '*10': {'phenotype': 'Intermediate Metabolizer', 'variants': ['rs1065852']},
                    '*17': {'phenotype': 'Intermediate Metabolizer', 'variants': ['rs28371706']},
                    '*41': {'phenotype': 'Intermediate Metabolizer', 'variants': ['rs28371725']},
                    'xN': {'phenotype': 'Ultrarapid Metabolizer', 'variants': ['duplication']}
                },
                'drugs_affected': [
                    'Atomoxetine', 'Codeine', 'Tramadol', 'Venlafaxine',
                    'Aripiprazole', 'Risperidone', 'Fluoxetine', 'Paroxetine'
                ]
            },
            'CYP2C19': {
                'chr': '10',
                'gene_region': (94760650, 94853982),
                'star_alleles': {
                    '*1': {'phenotype': 'Normal Metabolizer', 'variants': []},
                    '*2': {'phenotype': 'Poor Metabolizer', 'variants': ['rs4244285']},
                    '*3': {'phenotype': 'Poor Metabolizer', 'variants': ['rs4986893']},
                    '*17': {'phenotype': 'Ultrarapid Metabolizer', 'variants': ['rs12248560']},
                },
                'drugs_affected': [
                    'Citalopram', 'Escitalopram', 'Sertraline',
                    'Amitriptyline', 'Clopidogrel', 'Diazepam'
                ]
            },
            'CYP3A4': {
                'chr': '7',
                'gene_region': (99354604, 99381855),
                'star_alleles': {
                    '*1': {'phenotype': 'Normal Metabolizer', 'variants': []},
                    '*22': {'phenotype': 'Intermediate Metabolizer', 'variants': ['rs35599367']},
                },
                'drugs_affected': [
                    'Alprazolam', 'Quetiapine', 'Aripiprazole', 'Midazolam'
                ]
            },
            'CYP2C9': {
                'chr': '10',
                'gene_region': (94938683, 94988859),
                'star_alleles': {
                    '*1': {'phenotype': 'Normal Metabolizer', 'variants': []},
                    '*2': {'phenotype': 'Intermediate Metabolizer', 'variants': ['rs1799853']},
                    '*3': {'phenotype': 'Poor Metabolizer', 'variants': ['rs1057910']},
                },
                'drugs_affected': [
                    'Phenytoin', 'Warfarin', 'NSAIDs'
                ]
            }
        }
        
        # Drug-enzyme interaction database
        self.drug_enzyme_map = {
            'Fluoxetine': {
                'metabolized_by': ['CYP2D6'],
                'inhibits': ['CYP2D6'],  # Strong inhibitor
                'inhibition_strength': 'strong'
            },
            'Paroxetine': {
                'metabolized_by': ['CYP2D6'],
                'inhibits': ['CYP2D6'],
                'inhibition_strength': 'strong'
            },
            'Sertraline': {
                'metabolized_by': ['CYP2C19', 'CYP2D6'],
                'inhibits': ['CYP2D6'],
                'inhibition_strength': 'moderate'
            },
            'Escitalopram': {
                'metabolized_by': ['CYP2C19'],
                'inhibits': [],
                'inhibition_strength': 'weak'
            },
            'Venlafaxine': {
                'metabolized_by': ['CYP2D6'],
                'inhibits': [],
                'inhibition_strength': None
            },
            'Atomoxetine': {
                'metabolized_by': ['CYP2D6'],
                'inhibits': [],
                'inhibition_strength': None
            },
            'Aripiprazole': {
                'metabolized_by': ['CYP2D6', 'CYP3A4'],
                'inhibits': [],
                'inhibition_strength': None
            },
            'Quetiapine': {
                'metabolized_by': ['CYP3A4'],
                'inhibits': [],
                'inhibition_strength': None
            }
        }
    
    def analyze_vcf(self, vcf_path):
        """
        Analyze VCF file for pharmacogenomic variants
        
        Returns:
            dict: CYP enzyme -> phenotype mapping
        """
        logger.info("Starting pharmacogenomic analysis...")
        
        results = {}
        
        try:
            vcf = VCF(vcf_path)
            
            for enzyme, data in self.cyp_variants.items():
                logger.info(f"Analyzing {enzyme}...")
                
                phenotype = self._determine_phenotype(vcf_path, enzyme, data)
                
                results[enzyme] = {
                    'phenotype': phenotype,
                    'drugs_affected': data['drugs_affected'],
                    'clinical_significance': self._get_significance(phenotype)
                }
            
            logger.info("Pharmacogenomic analysis complete")
            
            return results
        
        except Exception as e:
            logger.error(f"Pharmacogenomic analysis error: {e}")
            # Return default phenotypes
            return {
                enzyme: {
                    'phenotype': 'Normal Metabolizer',
                    'drugs_affected': data['drugs_affected'],
                    'clinical_significance': 'Standard dosing'
                }
                for enzyme, data in self.cyp_variants.items()
            }
    
    def _determine_phenotype(self, vcf_path, enzyme, enzyme_data):
        """
        Determine metabolizer phenotype for enzyme
        Simplified version - real implementation uses PharmCAT star allele matching
        """
        try:
            vcf = VCF(vcf_path)
            
            # Look for known variants
            detected_alleles = []
            
            for star_allele, allele_data in enzyme_data['star_alleles'].items():
                if star_allele == '*1':  # Reference allele
                    continue
                
                variants = allele_data['variants']
                
                # Check if any defining variants are present
                # This is simplified - real implementation checks haplotypes
                for rsid in variants:
                    if rsid and rsid != 'deletion' and rsid != 'duplication':
                        # Search VCF for this rsid
                        for variant in vcf:
                            if variant.ID == rsid:
                                detected_alleles.append(star_allele)
                                break
            
            # Determine phenotype based on detected alleles
            if not detected_alleles:
                return 'Normal Metabolizer'  # *1/*1 (wild-type)
            
            # Simple diplotype inference
            # In production, use proper star allele calling
            phenotypes = [
                enzyme_data['star_alleles'][allele]['phenotype']
                for allele in detected_alleles
            ]
            
            # Priority: Poor > Intermediate > Ultrarapid > Normal
            if 'Poor Metabolizer' in phenotypes:
                return 'Poor Metabolizer'
            elif 'Intermediate Metabolizer' in phenotypes:
                return 'Intermediate Metabolizer'
            elif 'Ultrarapid Metabolizer' in phenotypes:
                return 'Ultrarapid Metabolizer'
            else:
                return 'Normal Metabolizer'
        
        except Exception as e:
            logger.error(f"Error determining {enzyme} phenotype: {e}")
            return 'Normal Metabolizer'
    
    def _get_significance(self, phenotype):
        """Get clinical significance of phenotype"""
        significance_map = {
            'Poor Metabolizer': 'Reduced dose recommended - risk of adverse effects',
            'Intermediate Metabolizer': 'Consider dose adjustment',
            'Normal Metabolizer': 'Standard dosing',
            'Rapid Metabolizer': 'May require higher dose',
            'Ultrarapid Metabolizer': 'Significantly higher dose may be needed'
        }
        
        return significance_map.get(phenotype, 'Standard dosing')
    
    def check_drug_interaction(self, drug1, drug2):
        """
        Check if two drugs have problematic interactions
        
        Returns:
            dict: Interaction details
        """
        if drug1 not in self.drug_enzyme_map or drug2 not in self.drug_enzyme_map:
            return {'interaction': False, 'severity': None, 'description': None}
        
        drug1_data = self.drug_enzyme_map[drug1]
        drug2_data = self.drug_enzyme_map[drug2]
        
        # Check if drug1 inhibits enzyme needed by drug2
        if drug1_data.get('inhibits'):
            for enzyme in drug1_data['inhibits']:
                if enzyme in drug2_data.get('metabolized_by', []):
                    strength = drug1_data.get('inhibition_strength', 'unknown')
                    
                    return {
                        'interaction': True,
                        'severity': 'high' if strength == 'strong' else 'moderate',
                        'description': f"{drug1} inhibits {enzyme}, which metabolizes {drug2}",
                        'enzyme': enzyme,
                        'recommendation': f"Avoid combination or reduce {drug2} dose significantly"
                    }
        
        # Check reverse
        if drug2_data.get('inhibits'):
            for enzyme in drug2_data['inhibits']:
                if enzyme in drug1_data.get('metabolized_by', []):
                    strength = drug2_data.get('inhibition_strength', 'unknown')
                    
                    return {
                        'interaction': True,
                        'severity': 'high' if strength == 'strong' else 'moderate',
                        'description': f"{drug2} inhibits {enzyme}, which metabolizes {drug1}",
                        'enzyme': enzyme,
                        'recommendation': f"Avoid combination or reduce {drug1} dose significantly"
                    }
        
        return {'interaction': False, 'severity': None, 'description': None}
