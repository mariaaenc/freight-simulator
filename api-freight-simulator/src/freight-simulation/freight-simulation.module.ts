import { Module } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationController } from './freight-simulation.controller';
import { GeocodingModule } from '@/geocoding/geocoding.module';
import { FreightSimulationApiService } from './freight-simulation.api.service';

@Module({
  imports: [GeocodingModule],
  controllers: [FreightSimulationController],
  providers: [FreightSimulationService, FreightSimulationApiService],
})
export class FreightSimulationModule {}
