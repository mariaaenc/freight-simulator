import { Module } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationController } from './freight-simulation.controller';

@Module({
  controllers: [FreightSimulationController],
  providers: [FreightSimulationService],
})
export class FreightSimulationModule {}
