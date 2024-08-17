export class Operator {
  id: string;
  name: string;
  deliveryTime: number;
  totalCost: number | string;
  lowestCost: boolean;
  fastestDelivery: boolean;
  divisor: number;
  freightInformation: FreightInformation[];
}

export enum OperatorDistanceRange {
  LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED = 'less_than_or_equal_to_one_hundred',
  LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED = 'less_than_or_equal_to_five_hundred',
  OTHER_VALUE = 'other_value',
}

export interface FreightInformation {
  distance: OperatorDistanceRange;
  multiplesOfDistance: number;
  deliveryTime: number;
}
