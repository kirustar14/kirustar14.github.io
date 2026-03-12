import React from 'react';

interface Alert {
  type: string;
  severity: string;
  title: string;
  description: string;
  recommendation: string;
  drugs?: string[];
}

interface SafetyAlertsProps {
  alerts: Alert[];
}

const SafetyAlerts: React.FC<SafetyAlertsProps> = ({ alerts }) => {
  const getSeverityClass = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return 'alert-critical';
      case 'HIGH':
        return 'alert-high';
      case 'MODERATE':
        return 'alert-moderate';
      default:
        return 'alert-low';
    }
  };

  return (
    <div className="safety-alerts-container">
      <div className="section-header">
        <span className="section-tag alert-tag">⚠️ SAFETY ALERTS</span>
        <h2>Drug Interaction Warnings</h2>
        <p className="section-description">
          Critical safety checks based on genetic profile and drug combinations
        </p>
      </div>

      <div className="alerts-grid">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`alert-card ${getSeverityClass(alert.severity)}`}>
            <div className="alert-header">
              <span className="alert-icon">
                {alert.severity === 'CRITICAL' ? '🚨' : '⚠️'}
              </span>
              <div>
                <h4>{alert.title}</h4>
                <span className="alert-severity">{alert.severity}</span>
              </div>
            </div>

            <div className="alert-body">
              <p className="alert-description">{alert.description}</p>

              {alert.drugs && alert.drugs.length > 0 && (
                <div className="alert-drugs">
                  <strong>Affected Drugs:</strong>
                  <div className="drug-tags">
                    {alert.drugs.map((drug, i) => (
                      <span key={i} className="drug-tag">{drug}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="alert-recommendation">
                <strong>Recommendation:</strong>
                <p>{alert.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyAlerts;
