import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { OperatorApiService } from './operator.api.service';

@Module({
  controllers: [OperatorController],
  providers: [OperatorService, OperatorApiService],
  exports: [OperatorService],
})
export class OperatorModule {}
