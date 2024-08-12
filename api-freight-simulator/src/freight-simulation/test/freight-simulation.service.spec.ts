import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationService } from '../freight-simulation.service';
import { GeocodingModule } from '@/geocoding/geocoding.module';
import { GeocodingService } from '@/geocoding/geocoding.service';

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
        originZipCode: '89222520',
        destinationZipCode: '01001000',
        height: 0,
        width: 0,
        length: 0,
      });
      expect(response).toEqual([
        {
          deliveryTime: 1,
          fastestDelivery: true,
          lowestCost: true,
          name: 'Operador 1',
          totalCost: 'R$ 9,60',
        },
        {
          deliveryTime: 1,
          fastestDelivery: false,
          lowestCost: false,
          name: 'Operador 2',
          totalCost: 'R$ 10,80',
        },
      ]);
    });
  });
});
