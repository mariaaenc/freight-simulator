export class Operator {
  id: string;
  name: string;
  divisor: number;
  freightInformation: FreightInformation[];
  deliveryTime?: number;
  totalCost?: number | string;
  lowestCost?: boolean;
  fastestDelivery?: boolean;

  constructor(data: Operator) {
    this.id = data.id;
    this.name = data.name;
    this.divisor = data.divisor;
    this.freightInformation = data.freightInformation;
  }
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
