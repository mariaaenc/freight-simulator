export class FreightSimulation {
  customerId: string;
  originZipCode: string;
  destinationZipCode: string;
  height: number;
  width: number;
  length: number;
  createdAt: Date;
  operatorsResult: {
    operatorId: string;
    name: string;
    totalCost: number | string;
    deliveryTime: number;
    lowestCost: boolean;
    fastestDelivery: boolean;
  }[];
}
