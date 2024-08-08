import { Injectable } from '@nestjs/common';
import { currencyFormat } from './helpers';
import { Operator, ProductDataToSimulateFreight } from './app.types';

@Injectable()
export class AppService {
  simulateFreight(data: ProductDataToSimulateFreight): Operator[] {
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
    return operators.map((item) => ({
      ...item,
      totalCost: currencyFormat(item.totalCost),
    }));
  }

  calculateCostPerCubicWeight(data: ProductDataToSimulateFreight): number[] {
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
    };
    const operator2: Operator = {
      name: 'Operador 2',
      deliveryTime: 0,
      totalCost: 0,
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
}
