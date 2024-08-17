import { Test, TestingModule } from '@nestjs/testing';
import { GeocodingService } from '@/geocoding/geocoding.service';
import { OperatorDistanceRange } from '@/operator/entities/operator.entity';
import { FreightSimulationService } from '../freight-simulation.service';
import { FreightSimulationApiService } from '../freight-simulation.api.service';
import { CreateFreightSimulationDto } from '../dto/create-freight-simulation.dto';
import { freightSimulationRequestMock } from '../mocks/freight-simulation.mock';

describe('FreightSimulationService', () => {
  let service: FreightSimulationService;
  const getLongitudeAndLatitudeMock = jest.fn();
  const createFreightSimulationApiMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FreightSimulationService,
        {
          provide: GeocodingService,
          useValue: {
            getLongitudeAndLatitude: getLongitudeAndLatitudeMock,
          },
        },
        {
          provide: FreightSimulationApiService,
          useValue: {
            create: createFreightSimulationApiMock,
          },
        },
      ],
    }).compile();

    service = module.get<FreightSimulationService>(FreightSimulationService);
  });

  describe('create', () => {
    it('should create and return freight simulation', async () => {
      getLongitudeAndLatitudeMock
        .mockReturnValueOnce({ latitude: -26.9211, longitude: -49.0662 })
        .mockReturnValueOnce({ latitude: -26.7882, longitude: -48.6358 });

      const response = await service.create(freightSimulationRequestMock);

      expect(response).toEqual([
        {
          id: '1',
          name: 'Operador 1',
          totalCost: 'R$ 7,20',
          deliveryTime: 1,
          lowestCost: false,
          fastestDelivery: true,
        },
        {
          id: '2',
          name: 'Operador 2',
          totalCost: 'R$ 6,00',
          deliveryTime: 1,
          lowestCost: true,
          fastestDelivery: true,
        },
      ]);
    });

    it('should create and return freight simulation for different values', async () => {
      getLongitudeAndLatitudeMock
        .mockReturnValueOnce({ latitude: -28.9211, longitude: -78.0662 })
        .mockReturnValueOnce({ latitude: -26.7882, longitude: -48.6358 });

      const response = await service.create({
        ...freightSimulationRequestMock,
        height: 10,
        width: 30,
        length: 10,
      });
      expect(response).toEqual([
        {
          id: '1',
          name: 'Operador 1',
          totalCost: 'R$ 30,00',
          deliveryTime: 4,
          lowestCost: false,
          fastestDelivery: true,
        },
        {
          id: '2',
          name: 'Operador 2',
          totalCost: 'R$ 24,00',
          deliveryTime: 5,
          lowestCost: true,
          fastestDelivery: false,
        },
      ]);
    });
  });

  describe('calculateCostPerCubicWeight', () => {
    it.each`
      divisor | expected
      ${5000} | ${6}
      ${7000} | ${6}
      ${500}  | ${48}
      ${100}  | ${240}
    `(
      'should calculate cost per cubic weight correctly for operator with divisor $divisor',
      ({ divisor, expected }) => {
        const data = {
          height: 30,
          width: 20,
          length: 40,
        } as CreateFreightSimulationDto;
        const totalCost = service['calculateCostPerCubicWeight'](data, divisor);
        expect(totalCost).toEqual(expected);
      },
    );
  });

  describe('getFreightInformation', () => {
    const freightInformation = [
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
    ];
    it('should return correct freight information for distance ≤ 100 km', () => {
      const distance = 50;
      const response = service['getFreightInformation'](
        freightInformation,
        distance,
      );
      expect(response).toEqual(freightInformation[0]);
    });

    it('should return correct freight information for 100 km < distance ≤ 500 km', () => {
      const distance = 300;
      const response = service['getFreightInformation'](
        freightInformation,
        distance,
      );
      expect(response).toEqual(freightInformation[1]);
    });

    it('should return correct freight information for distance > 500 km', () => {
      const distance = 1000;
      const response = service['getFreightInformation'](
        freightInformation,
        distance,
      );
      expect(response).toEqual(freightInformation[2]);
    });
  });

  describe('setLowestCostAndFastestDeliveryOperator', () => {
    it('should correctly identify the operator with the lowest cost and fastest delivery', () => {
      const operators = [
        {
          id: '1',
          name: 'Operador 1',
          totalCost: 9.5,
          deliveryTime: 4,
          lowestCost: false,
          fastestDelivery: false,
        },
        {
          id: '2',
          name: 'Operador 2',
          totalCost: 7.0,
          deliveryTime: 3,
          lowestCost: false,
          fastestDelivery: false,
        },
      ];

      service['setLowestCostAndFastestDeliveryOperator'](operators);

      expect(operators[0].lowestCost).toBe(false);
      expect(operators[0].fastestDelivery).toBe(false);
      expect(operators[1].lowestCost).toBe(true);
      expect(operators[1].fastestDelivery).toBe(true);
    });
  });
});
