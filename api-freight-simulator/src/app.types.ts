export interface Operator {
  name: string;
  deliveryTime: number;
  totalCost: number | string;
  lowestCost: boolean;
  fastestDelivery: boolean;
}
