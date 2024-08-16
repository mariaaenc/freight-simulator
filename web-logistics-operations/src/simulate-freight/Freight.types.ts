export interface FreightOperator {
  operatorId: string;
  name: string;
  totalCost: number | string;
  deliveryTime: number;
  lowestCost: boolean;
  fastestDelivery: boolean;
}