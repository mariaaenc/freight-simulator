import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductDataToSimulateFreight } from './app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('simulate')
  simulateFreight(@Body() data: ProductDataToSimulateFreight): string {
    return this.appService.simulateFreight(data);
  }
}
