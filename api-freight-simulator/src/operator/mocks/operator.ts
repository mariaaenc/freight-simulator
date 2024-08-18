import { Operator, OperatorDistanceRange } from '../entities/operator.entity';

export const freightInformationMock = [
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
    multiplesOfDistance: 5,
    deliveryTime: 4,
  },
];

export const operatorToCreateMock = {
  name: 'Operador 1',
  divisor: 5000,
  freightInformation: freightInformationMock,
};

export const operatorsMock: Operator[] = [
  {
    id: '1',
    name: 'Operador 1',
    deliveryTime: 0,
    totalCost: 0,
    lowestCost: false,
    fastestDelivery: false,
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
  },
  {
    id: '2',
    name: 'Operador 2',
    deliveryTime: 0,
    totalCost: 0,
    lowestCost: false,
    fastestDelivery: false,
    divisor: 6000,
    freightInformation: [
      {
        distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED,
        multiplesOfDistance: 1.0,
        deliveryTime: 1,
      },
      {
        distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED,
        multiplesOfDistance: 1.8,
        deliveryTime: 2,
      },
      {
        distance: OperatorDistanceRange.OTHER_VALUE,
        multiplesOfDistance: 4.0,
        deliveryTime: 5,
      },
    ],
  },
];
