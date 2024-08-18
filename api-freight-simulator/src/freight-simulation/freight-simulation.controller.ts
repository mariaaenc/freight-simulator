import { ApiTags, ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Simulate and return freight simulation' })
  create(@Body() createFreightSimulationDto: CreateFreightSimulationDto) {
    return this.freightSimulationService.create(createFreightSimulationDto);
  }

  @Get('/customer/:id')
  @ApiTags('Freight Simulation')
  @ApiOperation({ summary: 'Get all freight simulations by customer id' })
  findAllByCustomer(@Param('id') id: string) {
    return this.freightSimulationService.findAllByCustomer(id);
  }
}
