import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GeocodingApiService } from '../geocoding.api.service';
import { mockGeocodingResponse } from '../mocks/geocoding.mock';

const defaultAxiosResponse: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as AxiosResponse['config'],
};

describe('GeocodingApiService', () => {
  let service: GeocodingApiService;
  const httpServiceGetFunctionMock = jest.fn();
  const consoleErrorSpy = jest.spyOn(console, 'error');

  beforeEach(async () => {
    process.env.GOOGLE_GEOCODE_API_KEY = 'fake_api_key';
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        GeocodingApiService,
        {
          provide: HttpService,
          useValue: {
            get: httpServiceGetFunctionMock,
          },
        },
      ],
    }).compile();

    service = module.get<GeocodingApiService>(GeocodingApiService);
  });

  describe('getGeocoding', () => {
    it('should return correct response when api return success', async () => {
      httpServiceGetFunctionMock.mockReturnValueOnce(
        of({
          ...defaultAxiosResponse,
          data: mockGeocodingResponse,
        }),
      );
      const response = await service.getGeocoding('89222520');
      expect(response).toEqual(mockGeocodingResponse);
      expect(httpServiceGetFunctionMock).toHaveBeenCalledWith(
        'https://maps.googleapis.com/maps/api/geocode/json?address=89222520&key=fake_api_key',
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should throw error when not found geocoding by address', async () => {
      httpServiceGetFunctionMock.mockReturnValueOnce(
        of({
          ...defaultAxiosResponse,
          data: {
            results: [],
          },
        }),
      );
      await expect(service.getGeocoding('89222520')).rejects.toThrow(
        'Error to get geocoding data',
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to get geocoding data from address: 89222520. Error: Not found geocoding information for address: 89222520.',
      );
    });

    it('should throw error when something failed', async () => {
      httpServiceGetFunctionMock.mockReturnValueOnce(
        throwError(() => new Error('error')),
      );
      await expect(service.getGeocoding('89222520')).rejects.toThrow(
        'Error to get geocoding data',
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to get geocoding data from address: 89222520. Error: error',
      );
    });
  });
});
