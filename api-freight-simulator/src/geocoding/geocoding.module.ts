import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from './geocoding.service';
import { GeocodingApiService } from './geocoding.api.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [GeocodingService, GeocodingApiService],
})
export class GeocodingModule {}
