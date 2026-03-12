import React from 'react';

interface ClusterScoresProps {
  clusterScores: Record<string, number>;
}

const ClusterScores: React.FC<ClusterScoresProps> = ({ clusterScores }) => {
  const getInterpretation = (score: number) => {
    if (score < 25) return { level: 'Low', color: '#10b981' };
    if (score < 75) return { level: 'Average', color: '#f59e0b' };
    if (score < 90) return { level: 'High', color: '#ef4444' };
    return { level: 'Very High', color: '#dc2626' };
  };

  const clusterInfo: Record<string, { emoji: string; description: string }> = {
    Internalizing: {
      emoji: '😰',
      description: 'Depression, anxiety, mood disorders',
    },
    Compulsive: {
      emoji: '🔄',
      description: 'OCD, eating disorders',
    },
    Psychotic: {
      emoji: '🌀',
      description: 'Schizophrenia, bipolar',
    },
    Neurodevelopmental: {
      emoji: '🧠',
      description: 'ADHD, autism',
    },
    Externalizing: {
      emoji: '⚡',
      description: 'Impulse control, addiction',
    },
  };

  return (
    <div className="cluster-scores">
      {Object.entries(clusterScores).map(([factor, score]) => {
        const interp = getInterpretation(score);
        const info = clusterInfo[factor] || { emoji: '📊', description: '' };

        return (
          <div key={factor} className="cluster-card">
            <div className="cluster-header">
              <span className="cluster-emoji">{info.emoji}</span>
              <div>
                <h4>{factor}</h4>
                <p className="cluster-description">{info.description}</p>
              </div>
            </div>
            
            <div className="cluster-score">
              <div className="score-value">{score.toFixed(1)}%</div>
              <div
                className="score-label"
                style={{ color: interp.color }}
              >
                {interp.level} Risk
              </div>
            </div>
            
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${score}%`,
                  backgroundColor: interp.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClusterScores;
