export interface ProductDataToSimulateFreight {
  originZipCode: string;
  destinationZipcode: string;
  height: number;
  width: number;
  length: number;
}

export interface Operator {
  name: string;
  deliveryTime: number;
  totalCost: number | string;
}
