import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarChartProps {
  clusterScores: Record<string, number>;
}

const RadarChart: React.FC<RadarChartProps> = ({ clusterScores }) => {
  const data = Object.entries(clusterScores).map(([factor, score]) => ({
    factor,
    score,
    fullMark: 100,
  }));

  return (
    <div className="radar-chart-container">
      <h3>Genetic Risk Profile</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsRadar data={data}>
          <PolarGrid stroke="#cbd5e1" />
          <PolarAngleAxis
            dataKey="factor"
            tick={{ fill: '#475569', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <Radar
            name="Genetic Risk"
            dataKey="score"
            stroke="#2e7db5"
            fill="#2e7db5"
            fillOpacity={0.6}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
