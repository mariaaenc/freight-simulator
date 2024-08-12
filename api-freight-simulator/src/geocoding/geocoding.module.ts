import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from './geocoding.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [GeocodingService],
})
export class GeocodingModule {}
