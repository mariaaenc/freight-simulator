import { OperatorDistanceRange } from '../entities/operator.entity';

export const operatorToCreateMock = {
  name: 'Operador 1',
  divisor: 5000,
  freightInformation: [
    {
      distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED,
      multiplesOfDistance: 1.2,
      deliveryTime: 1,
    },
    {
      distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED,
      multiplesOfDistance: 1.6,
      deliveryTime: 3,
    },
    {
      distance: OperatorDistanceRange.OTHER_VALUE,
      multiplesOfDistance: 5.0,
      deliveryTime: 4,
    },
  ],
};
