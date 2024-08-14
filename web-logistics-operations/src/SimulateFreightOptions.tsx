import React from 'react';
import { FreightOperator } from './Freight.types';

interface SimulateFreightOptionsProps {
  freightOperatorOptions: FreightOperator[];
}

const SimulateFreightOptions: React.FC<SimulateFreightOptionsProps> = ({ freightOperatorOptions }) => {
  if (!freightOperatorOptions) return (<div></div>)
  return (
    <div>
      <h2>Opções de Frete</h2>
      <ul>
        {freightOperatorOptions.map((operator, index) => (
          <li key={index}>
            <div><strong>Operador:</strong> {operator.name}</div>
            <div><strong>Tempo de entrega:</strong> {operator.deliveryTime}</div>
            <div><strong>Custo Total:</strong> {operator.totalCost}</div>
            {operator.fastestDelivery && <div>Melhor tempo</div>}
            {operator.lowestCost && <div>Menor custo</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimulateFreightOptions;
