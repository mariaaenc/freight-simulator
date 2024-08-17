export interface FreightOperator {
  id: string;
  name: string;
  totalCost: number | string;
  deliveryTime: number;
  lowestCost: boolean;
  fastestDelivery: boolean;
}