export interface Operator {
  operatorId: string;
  name: string;
  deliveryTime: number;
  totalCost: number | string;
  lowestCost: boolean;
  fastestDelivery: boolean;
}
