import { Test, TestingModule } from '@nestjs/testing';
import { GeocodingService } from '../geocoding.service';
import { GeocodingApiService } from '../geocoding.api.service';
import { mockGeocodingResponse } from '../mocks/geocoding.mock';

describe('GeocodingService', () => {
  let service: GeocodingService;
  const getGeocodingMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeocodingService,
        {
          provide: GeocodingApiService,
          useValue: {
            getGeocoding: getGeocodingMock,
          },
        },
      ],
    }).compile();

    service = module.get<GeocodingService>(GeocodingService);
  });

  describe('getLongitudeAndLatitude()', () => {
    it('should return correct value', async () => {
      getGeocodingMock.mockReturnValueOnce(mockGeocodingResponse);
      const response = await service.getLongitudeAndLatitude('89222520');
      expect(response).toEqual({
        latitude: -26.2688194,
        longitude: -48.84945159999999,
      });
    });
  });
});
