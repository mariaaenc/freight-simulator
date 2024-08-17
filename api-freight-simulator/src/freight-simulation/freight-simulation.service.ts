import { Injectable } from '@nestjs/common';
import { currencyFormat, calculateDistance } from '@/helpers';
import { GeocodingService } from '@/geocoding/geocoding.service';
import { CreateFreightSimulationDto } from './dto/create-freight-simulation.dto';
import { FreightSimulationApiService } from './freight-simulation.api.service';
import {
  FreightInformation,
  Operator,
  OperatorDistanceRange,
} from '@/operator/entities/operator.entity';

@Injectable()
export class FreightSimulationService {
  constructor(
    private readonly geocodingService: GeocodingService,
    private readonly freightSimulationApiService: FreightSimulationApiService,
  ) {}
  public async create(data: CreateFreightSimulationDto) {
    const distance = await this.calculateDistanceBetweenLocations(
      data.originZipCode,
      data.destinationZipCode,
    );
    const operators = this.calculateOperatorsTotalCostAndDeliveryTime(
      distance,
      data,
    );

    this.setLowestCostAndFastestDeliveryOperator(operators);

    await this.freightSimulationApiService.create({
      ...data,
      operatorsResult: operators,
    });

    return operators.map((item) => ({
      ...item,
      totalCost: currencyFormat(item.totalCost),
    }));
  }

  private calculateCostPerCubicWeight(
    data: CreateFreightSimulationDto,
    operatorDivisor: number,
  ): number {
    const minimumCost = 6;
    const operatorCost =
      (data.width * data.height * data.length) / operatorDivisor;
    const costPerCubicWeight =
      operatorCost < minimumCost ? minimumCost : operatorCost;
    return costPerCubicWeight;
  }

  private async calculateDistanceBetweenLocations(
    originZipCode: string,
    destinationZipCode: string,
  ): Promise<number> {
    const [originGeocoding, destinationGeocoding] = await Promise.all([
      this.geocodingService.getLongitudeAndLatitude(originZipCode),
      this.geocodingService.getLongitudeAndLatitude(destinationZipCode),
    ]);

    const distance = calculateDistance(
      originGeocoding.latitude,
      originGeocoding.longitude,
      destinationGeocoding.latitude,
      destinationGeocoding.longitude,
    );

    return distance;
  }

  private getFreightInformation(
    freightInformation: FreightInformation[],
    distance: number,
  ): FreightInformation {
    if (distance <= 100) {
      return freightInformation.find(
        (info) =>
          info.distance ===
          OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED,
      )!;
    } else if (distance <= 500) {
      return freightInformation.find(
        (info) =>
          info.distance ===
          OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED,
      )!;
    } else {
      return freightInformation.find(
        (info) => info.distance === OperatorDistanceRange.OTHER_VALUE,
      )!;
    }
  }

  private calculateOperatorsTotalCostAndDeliveryTime(
    distance: number,
    data: CreateFreightSimulationDto,
  ): Partial<Operator>[] {
    const operators: Operator[] = [
      {
        id: '1',
        name: 'Operador 1',
        deliveryTime: 0,
        totalCost: 0,
        lowestCost: false,
        fastestDelivery: false,
        divisor: 5000,
        freightInformation: [
          {
            distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED,
            multiplesOfDistance: 1.2,
            deliveryTime: 1,
          },
          {
            distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED,
            multiplesOfDistance: 1.6,
            deliveryTime: 3,
          },
          {
            distance: OperatorDistanceRange.OTHER_VALUE,
            multiplesOfDistance: 5.0,
            deliveryTime: 4,
          },
        ],
      },
      {
        id: '2',
        name: 'Operador 2',
        deliveryTime: 0,
        totalCost: 0,
        lowestCost: false,
        fastestDelivery: false,
        divisor: 6000,
        freightInformation: [
          {
            distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_ONE_HUNDRED,
            multiplesOfDistance: 1.0,
            deliveryTime: 1,
          },
          {
            distance: OperatorDistanceRange.LESS_THAN_OR_EQUAL_TO_FIVE_HUNDRED,
            multiplesOfDistance: 1.8,
            deliveryTime: 2,
          },
          {
            distance: OperatorDistanceRange.OTHER_VALUE,
            multiplesOfDistance: 4.0,
            deliveryTime: 5,
          },
        ],
      },
    ];

    return operators.map((operator: Operator) => {
      const costPerCubicWeight = this.calculateCostPerCubicWeight(
        data,
        operator.divisor,
      );
      const { multiplesOfDistance, deliveryTime } = this.getFreightInformation(
        operator.freightInformation,
        distance,
      );

      const totalCost = costPerCubicWeight * multiplesOfDistance;

      return {
        totalCost,
        deliveryTime,
        id: operator.id,
        name: operator.name,
        lowestCost: operator.lowestCost,
        fastestDelivery: operator.fastestDelivery,
      };
    });
  }

  private setLowestCostAndFastestDeliveryOperator(
    operators: Partial<Operator>[],
  ): void {
    const minCost = Math.min(
      ...operators.map(
        (operator) => (operator.totalCost as number) || Infinity,
      ),
    );

    const minDeliveryTime = Math.min(
      ...operators.map((operator) => operator.deliveryTime || Infinity),
    );

    operators.forEach((operator) => {
      if (operator.totalCost === minCost) operator.lowestCost = true;
      if (operator.deliveryTime === minDeliveryTime)
        operator.fastestDelivery = true;
    });
  }
}
