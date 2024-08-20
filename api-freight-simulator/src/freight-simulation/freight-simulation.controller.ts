import { ApiTags, ApiOperation, ApiSecurity, ApiHeader } from '@nestjs/swagger';
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FreightSimulationService } from './freight-simulation.service';
import { CreateFreightSimulationDto } from './dto/create-freight-simulation.dto';

@ApiHeader({
  name: 'x-customer-uid',
  description: 'Customer uid',
  required: true,
  schema: { type: 'string' },
})
@Controller('freight-simulation')
export class FreightSimulationController {
  constructor(
    private readonly freightSimulationService: FreightSimulationService,
  ) {}

  @Post()
  @ApiTags('Freight Simulation')
  @ApiSecurity('authorization')
  @ApiOperation({ summary: 'Simulate and return freight simulation' })
  create(@Body() createFreightSimulationDto: CreateFreightSimulationDto) {
    return this.freightSimulationService.create(createFreightSimulationDto);
  }

  @Get('/customer/:id')
  @ApiSecurity('authorization')
  @ApiTags('Freight Simulation')
  @ApiOperation({ summary: 'Get all freight simulations by customer id' })
  findAllByCustomer(@Param('id') id: string) {
    return this.freightSimulationService.findAllByCustomer(id);
  }
}
