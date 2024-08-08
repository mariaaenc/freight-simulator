import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Operator, ProductDataToSimulateFreight } from './app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('simulate')
  simulateFreight(@Body() data: ProductDataToSimulateFreight): Operator[] {
    return this.appService.simulateFreight(data);
  }
}
