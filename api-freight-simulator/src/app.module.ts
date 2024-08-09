import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FreightSimulationModule } from './freight-simulation/freight-simulation.module';

@Module({
  imports: [FreightSimulationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
