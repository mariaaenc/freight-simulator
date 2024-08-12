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

export class FreightSimulationServiceMock {
  create = jest.fn().mockReturnValueOnce(freightSimulationsMock);
}
