import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationService } from '../freight-simulation.service';
import { GeocodingModule } from '@/geocoding/geocoding.module';
import { GeocodingService } from '@/geocoding/geocoding.service';
import { FreightSimulationApiService } from '../freight-simulation.api.service';

describe('FreightSimulationService', () => {
  let service: FreightSimulationService;
  const getLongitudeAndLatitudeMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GeocodingModule],
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
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FreightSimulationService>(FreightSimulationService);
  });

  describe('create', () => {
    it('should create and return freight simulation', async () => {
      getLongitudeAndLatitudeMock
        .mockReturnValueOnce({
          latitude: -26.9211,
          longitude: -49.0662,
        })
        .mockReturnValueOnce({
          latitude: -26.7882,
          longitude: -48.6358,
        });
      const response = await service.create({
        customerId: '123',
        originZipCode: '89222520',
        destinationZipCode: '01001000',
        height: 0,
        width: 0,
        length: 0,
      });
      expect(response).toEqual([
        {
          totalCost: 'R$ 7,20',
          deliveryTime: 1,
          operatorId: '1',
          name: 'Operador 1',
          lowestCost: false,
          fastestDelivery: true,
        },
        {
          totalCost: 'R$ 6,00',
          deliveryTime: 1,
          operatorId: '2',
          name: 'Operador 2',
          lowestCost: true,
          fastestDelivery: true,
        },
      ]);
    });
  });
});
