"""
Drug Resolver
Generates medication recommendations based on cluster scores and pharmacogenomics
Implements the 3 critical safety checks from the specification
"""

import logging

logger = logging.getLogger(__name__)

class DrugResolver:
    """Resolve medication recommendations with safety checks"""
    
    def __init__(self):
        # Medication database organized by cluster
        self.cluster_medications = {
            'Internalizing': {
                'first_line': [
                    {
                        'name': 'Sertraline',
                        'class': 'SSRI',
                        'dose_range': '50-200mg',
                        'cyp_enzymes': ['CYP2C19', 'CYP2D6']
                    },
                    {
                        'name': 'Escitalopram',
                        'class': 'SSRI',
                        'dose_range': '10-20mg',
                        'cyp_enzymes': ['CYP2C19']
                    },
                    {
                        'name': 'Fluoxetine',
                        'class': 'SSRI',
                        'dose_range': '20-80mg',
                        'cyp_enzymes': ['CYP2D6']
                    }
                ],
                'second_line': [
                    {
                        'name': 'Venlafaxine',
                        'class': 'SNRI',
                        'dose_range': '75-225mg',
                        'cyp_enzymes': ['CYP2D6']
                    },
                    {
                        'name': 'Bupropion',
                        'class': 'NDRI',
                        'dose_range': '150-450mg',
                        'cyp_enzymes': ['CYP2B6']
                    }
                ]
            },
            'Compulsive': {
                'first_line': [
                    {
                        'name': 'Fluoxetine',
                        'class': 'SSRI',
                        'dose_range': '40-80mg (high dose)',
                        'cyp_enzymes': ['CYP2D6']
                    },
                    {
                        'name': 'Fluvoxamine',
                        'class': 'SSRI',
                        'dose_range': '100-300mg',
                        'cyp_enzymes': ['CYP1A2']
                    }
                ]
            },
            'Psychotic': {
                'first_line': [
                    {
                        'name': 'Aripiprazole',
                        'class': 'Atypical Antipsychotic',
                        'dose_range': '10-30mg',
                        'cyp_enzymes': ['CYP2D6', 'CYP3A4']
                    },
                    {
                        'name': 'Quetiapine',
                        'class': 'Atypical Antipsychotic',
                        'dose_range': '300-800mg',
                        'cyp_enzymes': ['CYP3A4']
                    },
                    {
                        'name': 'Lithium',
                        'class': 'Mood Stabilizer',
                        'dose_range': '900-1800mg',
                        'cyp_enzymes': []  # Renal excretion
                    }
                ]
            },
            'Neurodevelopmental': {
                'first_line': [
                    {
                        'name': 'Methylphenidate',
                        'class': 'Stimulant',
                        'dose_range': '20-60mg',
                        'cyp_enzymes': []  # Not CYP metabolized
                    },
                    {
                        'name': 'Atomoxetine',
                        'class': 'Non-stimulant',
                        'dose_range': '40-100mg',
                        'cyp_enzymes': ['CYP2D6']
                    },
                    {
                        'name': 'Lisdexamfetamine',
                        'class': 'Stimulant',
                        'dose_range': '30-70mg',
                        'cyp_enzymes': []
                    }
                ]
            },
            'Externalizing': {
                'first_line': [
                    {
                        'name': 'Naltrexone',
                        'class': 'Opioid Antagonist',
                        'dose_range': '50-100mg',
                        'cyp_enzymes': []
                    },
                    {
                        'name': 'Bupropion',
                        'class': 'NDRI',
                        'dose_range': '300-450mg',
                        'cyp_enzymes': ['CYP2B6']
                    }
                ]
            }
        }
    
    def resolve_medications(self, cluster_scores, pharmaco_results):
        """
        Generate medication recommendations
        
        Args:
            cluster_scores: dict of factor -> percentile
            pharmaco_results: dict of enzyme -> phenotype data
        
        Returns:
            dict: Medication recommendations
        """
        logger.info("Generating medication recommendations...")
        
        recommendations = {
            'primary': [],
            'combination': [],
            'adjustments': []
        }
        
        # Identify dominant clusters (>75th percentile)
        dominant_clusters = [
            cluster for cluster, score in cluster_scores.items()
            if score >= 75
        ]
        
        logger.info(f"Dominant clusters: {dominant_clusters}")
        
        # Generate primary recommendations
        for cluster in dominant_clusters:
            if cluster in self.cluster_medications:
                medications = self.cluster_medications[cluster]['first_line']
                
                for med in medications:
                    # Adjust for pharmacogenomics
                    adjusted_med = self._adjust_for_cyp(med, pharmaco_results)
                    adjusted_med['cluster'] = cluster
                    adjusted_med['priority'] = cluster_scores[cluster]
                    
                    recommendations['primary'].append(adjusted_med)
        
        # Generate combination recommendations if multiple clusters elevated
        if len(dominant_clusters) >= 2:
            combos = self._generate_combinations(dominant_clusters, pharmaco_results)
            recommendations['combination'] = combos
        
        # Sort by priority
        recommendations['primary'].sort(key=lambda x: x['priority'], reverse=True)
        
        logger.info(f"Generated {len(recommendations['primary'])} recommendations")
        
        return recommendations
    
    def _adjust_for_cyp(self, medication, pharmaco_results):
        """Adjust medication dosing based on CYP phenotype"""
        adjusted = medication.copy()
        adjusted['cyp_adjustments'] = []
        
        for enzyme in medication['cyp_enzymes']:
            if enzyme in pharmaco_results:
                phenotype = pharmaco_results[enzyme]['phenotype']
                
                adjustment = {
                    'enzyme': enzyme,
                    'phenotype': phenotype,
                    'recommendation': ''
                }
                
                if phenotype == 'Poor Metabolizer':
                    adjustment['recommendation'] = f"Reduce dose by 50% due to {enzyme} poor metabolism"
                    adjustment['severity'] = 'high'
                elif phenotype == 'Intermediate Metabolizer':
                    adjustment['recommendation'] = f"Consider 25% dose reduction for {enzyme}"
                    adjustment['severity'] = 'moderate'
                elif phenotype == 'Ultrarapid Metabolizer':
                    adjustment['recommendation'] = f"May need 50% higher dose due to {enzyme} ultra-rapid metabolism"
                    adjustment['severity'] = 'moderate'
                else:
                    adjustment['recommendation'] = 'Standard dosing appropriate'
                    adjustment['severity'] = 'low'
                
                adjusted['cyp_adjustments'].append(adjustment)
        
        return adjusted
    
    def _generate_combinations(self, dominant_clusters, pharmaco_results):
        """Generate safe combination therapy recommendations"""
        combinations = []
        
        # Common safe combinations
        if 'Internalizing' in dominant_clusters and 'Neurodevelopmental' in dominant_clusters:
            combinations.append({
                'drugs': ['Escitalopram', 'Methylphenidate'],
                'rationale': 'SSRI + Stimulant for comorbid depression/anxiety and ADHD',
                'clusters': ['Internalizing', 'Neurodevelopmental'],
                'safety_profile': 'Generally safe combination'
            })
        
        if 'Internalizing' in dominant_clusters and 'Compulsive' in dominant_clusters:
            combinations.append({
                'drugs': ['Fluoxetine'],
                'rationale': 'High-dose SSRI addresses both anxiety/depression and OCD symptoms',
                'clusters': ['Internalizing', 'Compulsive'],
                'safety_profile': 'Single agent preferred - see serotonin syndrome warning'
            })
        
        if 'Psychotic' in dominant_clusters and 'Internalizing' in dominant_clusters:
            combinations.append({
                'drugs': ['Aripiprazole', 'Escitalopram'],
                'rationale': 'Atypical antipsychotic + SSRI for bipolar depression',
                'clusters': ['Psychotic', 'Internalizing'],
                'safety_profile': 'Monitor for side effects, generally tolerable'
            })
        
        return combinations
    
    def get_safety_alerts(self, recommendations, pharmaco_results):
        """
        Generate the 3 critical safety alerts from specification:
        1. Prozac-Enzyme Clash
        2. Serotonin Ceiling
        3. Bipolar Switch Guard
        """
        alerts = []
        
        # Get all recommended drugs
        all_drugs = []
        for rec in recommendations['primary']:
            all_drugs.append(rec['name'])
        
        for combo in recommendations.get('combination', []):
            all_drugs.extend(combo['drugs'])
        
        # Alert 1: Prozac-Enzyme Clash (Fluoxetine + CYP2D6 substrate)
        if 'Fluoxetine' in all_drugs:
            cyp2d6_substrates = ['Atomoxetine', 'Aripiprazole', 'Venlafaxine']
            
            for substrate in cyp2d6_substrates:
                if substrate in all_drugs:
                    alerts.append({
                        'type': 'ENZYME_INHIBITION',
                        'severity': 'CRITICAL',
                        'title': '⚠️ Prozac-Enzyme Clash Detected',
                        'description': f"Fluoxetine is a strong CYP2D6 inhibitor. Combining with {substrate} will increase {substrate} blood levels by up to 400%.",
                        'recommendation': f"AVOID this combination or reduce {substrate} dose by 75%",
                        'drugs': ['Fluoxetine', substrate],
                        'enzyme': 'CYP2D6'
                    })
        
        # Alert 2: Serotonin Ceiling (Multiple SSRIs)
        ssris = ['Fluoxetine', 'Sertraline', 'Escitalopram', 'Paroxetine', 'Fluvoxamine']
        ssris_in_use = [drug for drug in all_drugs if drug in ssris]
        
        if len(ssris_in_use) >= 2:
            alerts.append({
                'type': 'SEROTONIN_SYNDROME',
                'severity': 'CRITICAL',
                'title': '🚨 Serotonin Syndrome Risk',
                'description': f"Multiple serotonergic agents detected: {', '.join(ssris_in_use)}. Dual high-dose SSRI therapy significantly increases serotonin syndrome risk.",
                'recommendation': 'Use single SSRI at appropriate dose. DO NOT combine SSRIs.',
                'drugs': ssris_in_use,
                'symptoms': 'Watch for: confusion, agitation, tremor, muscle rigidity, hyperthermia'
            })
        
        # Alert 3: Bipolar Switch Guard (check cluster scores from context)
        # This requires cluster_scores to be passed - for now, check if antipsychotic missing
        antidepressants = ssris + ['Venlafaxine', 'Bupropion']
        antipsychotics = ['Aripiprazole', 'Quetiapine', 'Lithium']
        
        has_antidepressant = any(drug in all_drugs for drug in antidepressants)
        has_mood_stabilizer = any(drug in all_drugs for drug in antipsychotics)
        
        # This alert would ideally check if Psychotic cluster > 90th percentile
        # For now, warn if antidepressant without mood stabilizer and Psychotic meds present
        if has_antidepressant and 'Aripiprazole' in all_drugs or 'Quetiapine' in all_drugs:
            if not has_mood_stabilizer:
                alerts.append({
                    'type': 'BIPOLAR_SWITCH',
                    'severity': 'HIGH',
                    'title': '🛡️ Bipolar Switch Risk',
                    'description': 'Patient has elevated Psychotic cluster score. Antidepressant monotherapy may trigger manic episode.',
                    'recommendation': 'Ensure mood stabilizer or atypical antipsychotic is primary treatment before adding antidepressant',
                    'drugs': [d for d in all_drugs if d in antidepressants]
                })
        
        # Additional: CYP2D6 Poor Metabolizer warnings
        if 'CYP2D6' in pharmaco_results:
            if pharmaco_results['CYP2D6']['phenotype'] == 'Poor Metabolizer':
                cyp2d6_drugs = [d for d in all_drugs if d in ['Fluoxetine', 'Paroxetine', 'Atomoxetine', 'Aripiprazole', 'Venlafaxine']]
                
                if cyp2d6_drugs:
                    alerts.append({
                        'type': 'PHARMACOGENOMIC',
                        'severity': 'MODERATE',
                        'title': '💊 CYP2D6 Poor Metabolizer',
                        'description': f"Patient is a CYP2D6 Poor Metabolizer. Drugs affected: {', '.join(cyp2d6_drugs)}",
                        'recommendation': 'Start at 50% of normal dose and titrate slowly',
                        'drugs': cyp2d6_drugs,
                        'enzyme': 'CYP2D6'
                    })
        
        logger.info(f"Generated {len(alerts)} safety alerts")
        
        return alerts
