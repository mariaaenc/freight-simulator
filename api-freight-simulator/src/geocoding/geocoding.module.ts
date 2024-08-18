import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GeocodingService } from './geocoding.service';
import { GeocodingApiService } from './geocoding.api.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GeocodingService, GeocodingApiService],
  exports: [GeocodingService],
})
export class GeocodingModule {}
