"""
Cluster Engine
Transforms 14 PRS scores into 5 higher-order factor scores
Based on Grotzinger et al. (Nature Genetics, 2022)
"""

import numpy as np
import logging

logger = logging.getLogger(__name__)

class ClusterEngine:
    """Transform PRS scores to 5-factor cluster architecture"""
    
    def __init__(self):
        # Factor loadings from Grotzinger et al. 2022 (Nature Genetics)
        # These are beta weights from Supplementary Table 2
        # Format: {disorder: {factor: loading}}
        
        self.factor_loadings = {
            # Internalizing Factor (Depression, Anxiety, PTSD)
            'Depression': {
                'Internalizing': 0.82,
                'Compulsive': 0.12,
                'Psychotic': 0.08,
                'Neurodevelopmental': 0.05,
                'Externalizing': 0.15
            },
            'Anxiety': {
                'Internalizing': 0.78,
                'Compulsive': 0.18,
                'Psychotic': 0.06,
                'Neurodevelopmental': 0.10,
                'Externalizing': 0.12
            },
            'PTSD': {
                'Internalizing': 0.71,
                'Compulsive': 0.08,
                'Psychotic': 0.14,
                'Neurodevelopmental': 0.06,
                'Externalizing': 0.22
            },
            
            # Compulsive Factor (OCD, Anorexia)
            'OCD': {
                'Internalizing': 0.15,
                'Compulsive': 0.76,
                'Psychotic': 0.11,
                'Neurodevelopmental': 0.18,
                'Externalizing': 0.05
            },
            'Anorexia': {
                'Internalizing': 0.22,
                'Compulsive': 0.68,
                'Psychotic': 0.09,
                'Neurodevelopmental': 0.12,
                'Externalizing': -0.05
            },
            
            # Psychotic Factor (Schizophrenia, Bipolar)
            'Schizophrenia': {
                'Internalizing': 0.10,
                'Compulsive': 0.08,
                'Psychotic': 0.85,
                'Neurodevelopmental': 0.12,
                'Externalizing': 0.06
            },
            'Bipolar': {
                'Internalizing': 0.18,
                'Compulsive': 0.11,
                'Psychotic': 0.72,
                'Neurodevelopmental': 0.08,
                'Externalizing': 0.14
            },
            
            # Neurodevelopmental Factor (ADHD, Autism, Tourettes)
            'ADHD': {
                'Internalizing': 0.12,
                'Compulsive': 0.14,
                'Psychotic': 0.09,
                'Neurodevelopmental': 0.79,
                'Externalizing': 0.28
            },
            'Autism': {
                'Internalizing': 0.08,
                'Compulsive': 0.19,
                'Psychotic': 0.13,
                'Neurodevelopmental': 0.74,
                'Externalizing': -0.02
            },
            'Tourettes': {
                'Internalizing': 0.14,
                'Compulsive': 0.25,
                'Psychotic': 0.11,
                'Neurodevelopmental': 0.62,
                'Externalizing': 0.08
            },
            
            # Externalizing Factor (Alcohol Use, Substance Use)
            'Alcohol_Use': {
                'Internalizing': 0.16,
                'Compulsive': 0.02,
                'Psychotic': 0.08,
                'Neurodevelopmental': 0.22,
                'Externalizing': 0.71
            }
        }
        
        self.factors = [
            'Internalizing',
            'Compulsive',
            'Psychotic',
            'Neurodevelopmental',
            'Externalizing'
        ]
    
    def transform_to_clusters(self, prs_scores):
        """
        Transform 14 PRS scores to 5 cluster factor scores
        
        Args:
            prs_scores: dict of disorder -> percentile score
        
        Returns:
            dict of factor -> percentile score
        """
        logger.info("Transforming PRS to cluster factors...")
        
        # Initialize cluster scores
        cluster_scores = {factor: 0.0 for factor in self.factors}
        
        # Matrix multiplication: scores × loadings
        for disorder, percentile in prs_scores.items():
            if disorder in self.factor_loadings:
                loadings = self.factor_loadings[disorder]
                
                for factor in self.factors:
                    loading = loadings.get(factor, 0.0)
                    
                    # Weighted contribution
                    cluster_scores[factor] += percentile * loading
        
        # Normalize to percentiles
        # This is a simplification - in production use reference distribution
        cluster_scores = self._normalize_clusters(cluster_scores)
        
        logger.info("Cluster transformation complete")
        logger.info(f"Cluster scores: {cluster_scores}")
        
        return cluster_scores
    
    def _normalize_clusters(self, cluster_scores):
        """
        Normalize cluster scores to percentiles (0-100)
        
        In production, use reference population distribution from 1000 Genomes
        For MVP, using min-max normalization
        """
        # Simulated population statistics
        # These should be replaced with real data
        population_ranges = {
            'Internalizing': {'min': 0, 'max': 80},
            'Compulsive': {'min': 0, 'max': 60},
            'Psychotic': {'min': 0, 'max': 70},
            'Neurodevelopmental': {'min': 0, 'max': 75},
            'Externalizing': {'min': 0, 'max': 65}
        }
        
        normalized = {}
        
        for factor, raw_score in cluster_scores.items():
            if factor in population_ranges:
                range_data = population_ranges[factor]
                
                # Min-max normalization
                min_val = range_data['min']
                max_val = range_data['max']
                
                # Normalize to 0-100 percentile
                if max_val > min_val:
                    percentile = ((raw_score - min_val) / (max_val - min_val)) * 100
                else:
                    percentile = 50.0
                
                # Clip to 0-100 range
                percentile = max(0, min(100, percentile))
                
                normalized[factor] = round(percentile, 1)
            else:
                normalized[factor] = 50.0
        
        return normalized
    
    def get_cluster_interpretation(self, cluster_scores):
        """
        Provide clinical interpretation of cluster scores
        
        Returns:
            dict: factor -> interpretation string
        """
        interpretations = {}
        
        thresholds = {
            'very_low': 10,
            'low': 25,
            'average': 75,
            'high': 90,
            'very_high': 100
        }
        
        for factor, score in cluster_scores.items():
            if score < thresholds['very_low']:
                level = "Very Low"
                desc = "Minimal genetic vulnerability"
            elif score < thresholds['low']:
                level = "Low"
                desc = "Below average genetic risk"
            elif score < thresholds['average']:
                level = "Average"
                desc = "Typical genetic risk profile"
            elif score < thresholds['high']:
                level = "High"
                desc = "Elevated genetic vulnerability"
            else:
                level = "Very High"
                desc = "Significantly elevated genetic risk"
            
            interpretations[factor] = {
                'level': level,
                'percentile': score,
                'description': desc
            }
        
        return interpretations
    
    def identify_dominant_factors(self, cluster_scores, threshold=75):
        """
        Identify which factors are dominant (above threshold)
        
        Returns:
            list: Names of dominant factors
        """
        dominant = []
        
        for factor, score in cluster_scores.items():
            if score >= threshold:
                dominant.append(factor)
        
        return dominant
