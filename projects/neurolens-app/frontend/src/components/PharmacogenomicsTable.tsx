import React from 'react';

interface PharmacoData {
  phenotype: string;
  drugs_affected: string[];
  clinical_significance: string;
}

interface PharmacogenomicsTableProps {
  data: Record<string, PharmacoData>;
}

const PharmacogenomicsTable: React.FC<PharmacogenomicsTableProps> = ({ data }) => {
  const getPhenotypeColor = (phenotype: string) => {
    if (phenotype.includes('Poor')) return '#ef4444';
    if (phenotype.includes('Intermediate')) return '#f59e0b';
    if (phenotype.includes('Ultrarapid') || phenotype.includes('Rapid')) return '#3b82f6';
    return '#10b981';
  };

  return (
    <div className="pharmaco-table-container">
      <table className="pharmaco-table">
        <thead>
          <tr>
            <th>Enzyme</th>
            <th>Metabolizer Status</th>
            <th>Drugs Affected</th>
            <th>Clinical Significance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([enzyme, info]) => (
            <tr key={enzyme}>
              <td className="enzyme-cell">
                <strong>{enzyme}</strong>
              </td>
              <td className="phenotype-cell">
                <span
                  className="phenotype-badge"
                  style={{ backgroundColor: getPhenotypeColor(info.phenotype) }}
                >
                  {info.phenotype}
                </span>
              </td>
              <td className="drugs-cell">
                <div className="drug-chips">
                  {info.drugs_affected.slice(0, 4).map((drug, idx) => (
                    <span key={idx} className="drug-chip">{drug}</span>
                  ))}
                  {info.drugs_affected.length > 4 && (
                    <span className="drug-chip more">+{info.drugs_affected.length - 4} more</span>
                  )}
                </div>
              </td>
              <td className="significance-cell">
                {info.clinical_significance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacogenomicsTable;
