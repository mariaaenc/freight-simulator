import React from 'react';
import { FreightOperator } from './freight.types';
import { Card, CardContent, Typography } from '@mui/material';

interface SimulateFreightOptionsProps {
  freightOperatorOptions: FreightOperator[];
}

const SimulateFreightOptions: React.FC<SimulateFreightOptionsProps> = ({ freightOperatorOptions }) => {
  if (!freightOperatorOptions) return (<div></div>)
  return (
    <div>
      <h2>Opções de Frete</h2>
      <div className='Operator'>
        {freightOperatorOptions.map((operator) => (
          <Card className='Operator-item'>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                { operator.name }
              </Typography>
              <Typography variant="body2" color="text.secondary"><strong>Tempo de entrega:</strong> {operator.deliveryTime}</Typography>
              <Typography variant="body2" color="text.secondary"><strong>Custo Total:</strong> {operator.totalCost}</Typography>
              {operator.fastestDelivery && <Typography variant="body2" color="#00a152">*Melhor tempo</Typography>}
              {operator.lowestCost && <Typography variant="body2" color="#00a152">*Menor custo</Typography>}
            </CardContent>
          </Card>
          ))}
      </div>
    </div>
  );
};

export default SimulateFreightOptions;
