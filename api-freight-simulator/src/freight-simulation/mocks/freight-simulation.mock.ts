export const freightSimulationsMock = [
  {
    name: 'Operador 1',
    deliveryTime: 1,
    totalCost: 'R$ 9,60',
    fastestDelivery: true,
    lowestCost: true,
  },
  {
    name: 'Operador 2',
    deliveryTime: 1,
    totalCost: 'R$ 10,80',
    fastestDelivery: false,
    lowestCost: false,
  },
];

export const freightSimulationRequestMock = {
  customerId: 'customerId',
  originZipCode: '89222520',
  destinationZipCode: '01001000',
  height: 30,
  width: 20,
  length: 40,
};

export const freightSimulationMock = {
  customerId: 'customerId',
  originZipCode: '89222520',
  destinationZipCode: '01001000',
  height: 30,
  width: 20,
  length: 40,
  operatorsResult: [
    {
      id: '1',
      name: 'Operador 1',
      totalCost: 'R$ 9,60',
      deliveryTime: 3,
      lowestCost: false,
      fastestDelivery: false,
    },
    {
      id: '2',
      name: 'Operador 2',
      totalCost: 'R$ 10,80',
      deliveryTime: 2,
      lowestCost: true,
      fastestDelivery: true,
    },
  ],
};

export class FreightSimulationServiceMock {
  create = jest.fn().mockReturnValueOnce(freightSimulationsMock);
}
