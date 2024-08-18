import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { CreateFreightSimulationDto } from './dto/create-freight-simulation.dto';

@Controller('freight-simulation')
export class FreightSimulationController {
  constructor(
    private readonly freightSimulationService: FreightSimulationService,
  ) {}

  @Post()
  @ApiTags('Freight Simulation')
  create(@Body() createFreightSimulationDto: CreateFreightSimulationDto) {
    return this.freightSimulationService.create(createFreightSimulationDto);
  }

  @Get('/customer/:id')
  findAllByCustomer(@Param('id') id: string) {
    return this.freightSimulationService.findAllByCustomer(id);
  }
}
