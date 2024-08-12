import { Injectable } from '@nestjs/common';
import { LongitudeLatitudeResponse } from './geocoding.types';
import { GeocodingApiService } from './geocoding.api.service';

@Injectable()
export class GeocodingService {
  constructor(private readonly geocodingApiService: GeocodingApiService) {}

  public async getLongitudeAndLatitude(
    address: string,
  ): Promise<LongitudeLatitudeResponse> {
    const { results } = await this.geocodingApiService.getGeocoding(address);
    const geocodingResult = results[0].geometry;
    const lat = geocodingResult.location.lat;
    const lng = geocodingResult.location.lng;
    return { latitude: lat, longitude: lng };
  }
}
