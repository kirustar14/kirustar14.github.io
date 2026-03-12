import React from 'react';

interface Medication {
  name: string;
  class: string;
  dose_range: string;
  cluster: string;
  priority: number;
  cyp_adjustments?: Array<{
    enzyme: string;
    phenotype: string;
    recommendation: string;
    severity: string;
  }>;
}

interface MedicationCardProps {
  medication: Medication;
  rank: number;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, rank }) => {
  const getPriorityColor = (priority: number) => {
    if (priority >= 90) return '#dc2626';
    if (priority >= 75) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="medication-card">
      <div className="medication-header">
        <div className="medication-rank" style={{ backgroundColor: getPriorityColor(medication.priority) }}>
          #{rank}
        </div>
        <div>
          <h4>{medication.name}</h4>
          <span className="medication-class">{medication.class}</span>
        </div>
      </div>

      <div className="medication-body">
        <div className="medication-info">
          <div className="info-row">
            <span className="info-label">Dose Range:</span>
            <span className="info-value">{medication.dose_range}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Target Cluster:</span>
            <span className="info-value">{medication.cluster}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Genetic Match:</span>
            <span className="info-value">{medication.priority.toFixed(1)}%</span>
          </div>
        </div>

        {medication.cyp_adjustments && medication.cyp_adjustments.length > 0 && (
          <div className="cyp-adjustments">
            <h5>Pharmacogenomic Adjustments:</h5>
            {medication.cyp_adjustments
              .filter(adj => adj.severity !== 'low')
              .map((adj, idx) => (
                <div key={idx} className={`adjustment-item severity-${adj.severity}`}>
                  <span className="adjustment-enzyme">{adj.enzyme}:</span>
                  <span className="adjustment-text">{adj.recommendation}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationCard;
