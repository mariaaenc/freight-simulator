import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeocodingResponse } from './geocoding.types';

@Injectable()
export class GeocodingApiService {
  private readonly apiKey = this.configService.get<string>(
    'GOOGLE_GEOCODE_API_KEY',
  );
  private readonly geocodingUrl =
    'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getGeocoding(address: string): Promise<GeocodingResponse> {
    try {
      const url = `${this.geocodingUrl}?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
      const { data } = await firstValueFrom(
        this.httpService.get<GeocodingResponse>(url),
      );
      if (!data.results[0])
        throw new NotFoundException(
          `Not found geocoding information for address: ${address}.`,
        );
      return data;
    } catch (error) {
      console.error(
        `Failed to get geocoding data from address: ${address}. Error: ${error.message || error}`,
      );
      throw new HttpException(
        'Error to get geocoding data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
