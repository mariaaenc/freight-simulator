import { Module } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationController } from './freight-simulation.controller';
import { GeocodingModule } from '@/geocoding/geocoding.module';
import { FreightSimulationApiService } from './freight-simulation.api.service';
import { OperatorModule } from '@/operator/operator.module';

@Module({
  imports: [GeocodingModule, OperatorModule],
  controllers: [FreightSimulationController],
  providers: [FreightSimulationService, FreightSimulationApiService],
})
export class FreightSimulationModule {}
