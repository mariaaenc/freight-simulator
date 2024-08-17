import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from '@/common/mongodb/MongoModule';
import { FreightSimulationModule } from '@/freight-simulation/freight-simulation.module';
import { OperatorModule } from '@/operator/operator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FreightSimulationModule,
    MongoModule,
    OperatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
