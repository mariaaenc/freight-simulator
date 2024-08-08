import { Injectable } from '@nestjs/common';
import { ProductDataToSimulateFreight } from './app.types';

@Injectable()
export class AppService {
  simulateFreight(data: ProductDataToSimulateFreight): string {
    const [costForLogisticOperator1, costForLogisticOperator2] =
      this.calculateCostPerCubicWeight(data);
    const distance = this.calculateDistanceBetweenLocations(
      data.originZipCode,
      data.destinationZipcode,
    );
    console.log(costForLogisticOperator1, costForLogisticOperator2, distance);
    return 'Hello World!';
  }

  calculateCostPerCubicWeight(data: ProductDataToSimulateFreight) {
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
    console.log(originZipCode, destinationZipcode);
    return 0;
  }
}
