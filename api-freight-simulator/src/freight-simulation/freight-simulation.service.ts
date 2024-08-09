import { Injectable } from '@nestjs/common';
import { currencyFormat } from '../helpers';
import { Operator } from '../app.types';
import { CreateFreightSimulationDto } from './dto/create-freight-simulation.dto';

@Injectable()
export class FreightSimulationService {
  create(data: CreateFreightSimulationDto) {
    const [costForLogisticOperator1, costForLogisticOperator2] =
      this.calculateCostPerCubicWeight(data);
    const distance = this.calculateDistanceBetweenLocations(
      data.originZipCode,
      data.destinationZipcode,
    );
    const operators = this.calculateOperatorsTotalCostAndDeliveryTime(
      distance,
      costForLogisticOperator1,
      costForLogisticOperator2,
    );

    this.setLowestCostAndFastestDeliveryOperator(operators);

    return operators.map((item) => ({
      ...item,
      totalCost: currencyFormat(item.totalCost),
    }));
  }

  calculateCostPerCubicWeight(data: CreateFreightSimulationDto): number[] {
    const minimumCost = 6;
    const logisticOperator1 = (data.width * data.height * data.length) / 6000;
    const logisticOperator2 = (data.width * data.height * data.length) / 5000;
    const costForLogisticOperator1 =
      logisticOperator1 < minimumCost ? minimumCost : logisticOperator1;
    const costForLogisticOperator2 =
      logisticOperator2 < minimumCost ? minimumCost : logisticOperator2;
    return [costForLogisticOperator1, costForLogisticOperator2];
  }

  calculateDistanceBetweenLocations(
    originZipCode: string,
    destinationZipcode: string,
  ) {
    // TODO: Integração com geocoding
    console.log(originZipCode, destinationZipcode);
    return 0;
  }

  calculateOperatorsTotalCostAndDeliveryTime(
    distance: number,
    costForLogisticOperator1: number,
    costForLogisticOperator2: number,
  ): Operator[] {
    const operator1: Operator = {
      name: 'Operador 1',
      deliveryTime: 0,
      totalCost: 0,
      lowestCost: false,
      fastestDelivery: false,
    };
    const operator2: Operator = {
      name: 'Operador 2',
      deliveryTime: 0,
      totalCost: 0,
      lowestCost: false,
      fastestDelivery: false,
    };

    if (distance <= 100) {
      operator1.deliveryTime = 1;
      operator1.totalCost = costForLogisticOperator1 * 1.6;
      operator2.deliveryTime = 1;
      operator2.totalCost = costForLogisticOperator2 * 1.8;
    } else if (distance <= 500) {
      operator1.deliveryTime = 3;
      operator1.totalCost = costForLogisticOperator1 * 1.2;
      operator2.deliveryTime = 2;
      operator2.totalCost = costForLogisticOperator2 * 1.0;
    } else {
      operator1.deliveryTime = 4;
      operator1.totalCost = costForLogisticOperator1 * 5.0;
      operator2.deliveryTime = 5;
      operator2.totalCost = costForLogisticOperator2 * 4.0;
    }

    return [operator1, operator2];
  }

  setLowestCostAndFastestDeliveryOperator(operators: Operator[]): void {
    operators.sort(
      (operator1, operator2) =>
        Number(operator1.totalCost) - Number(operator2.totalCost),
    );

    const lowestCostOperator = operators[0];

    const minDeliveryTime = Math.min(
      ...operators.map((operator) => operator.deliveryTime),
    );

    const fastestDeliveryOperator = operators.find(
      (operator) => operator.deliveryTime === minDeliveryTime,
    );

    fastestDeliveryOperator.fastestDelivery = true;
    lowestCostOperator.lowestCost = true;
  }
}
