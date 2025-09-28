import { useState } from 'react';
import { ProductType, ProductData } from '../../types/form';
import { formatCurrency } from '../../utils/formatters';
import * as React from "react";

interface BenefitQuestionnaireProps {
  productId: ProductType;
  productName: string;
  data: ProductData;
  onChange: (field: string, value: unknown) => void;
}

const COMPANIES = [
  { value: '', label: 'Selecione...' },
  { value: 'vr', label: 'VR' },
  { value: 'ifood', label: 'iFood' },
  { value: 'cesta-basica', label: 'Cesta Básica' },
  { value: 'outras', label: 'Outras empresas não especificadas' }
];

export function BenefitQuestionnaire({
                                       productName,
  data,
  onChange
}: BenefitQuestionnaireProps) {
  const [showOtherCompany, setShowOtherCompany] = useState(data.empresa === 'outras');

  const handleCompanyChange = (value: string) => {
    onChange('empresa', value);
    setShowOtherCompany(value === 'outras');
    if (value !== 'outras') {
      onChange('empresaOutras', '');
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    onChange('valor', formatted);
  };

  return (
    <div className="questionnaire-section active">
      <h4>{productName}</h4>
      <div className="form-row-3">
        <div className="form-group">
          <label>Quantidade de Colaboradores</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={data.colaboradores || ''}
            onChange={(e) => onChange('colaboradores', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Valor Creditado por mês</label>
          <input
            type="text"
            className="form-control"
            value={data.valor || ''}
            onChange={handleCurrencyChange}
            placeholder="R$ 0,00"
          />
        </div>
        <div className="form-group">
          <label>Em qual empresa compra atualmente?</label>
          <select
            className="form-control"
            value={data.empresa || ''}
            onChange={(e) => handleCompanyChange(e.target.value)}
          >
            {COMPANIES.map(company => (
              <option key={company.value} value={company.value}>
                {company.label}
              </option>
            ))}
          </select>
          {showOtherCompany && (
            <input
              type="text"
              className="form-control other-company-input"
              value={data.empresaOutras || ''}
              onChange={(e) => onChange('empresaOutras', e.target.value)}
              placeholder="Especifique a empresa"
              style={{ marginTop: '0.5rem', display: 'block' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
