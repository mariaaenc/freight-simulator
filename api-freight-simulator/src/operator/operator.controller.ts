import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';

@ApiHeader({
  name: 'x-customer-uid',
  description: 'Customer uid',
  required: true,
  schema: { type: 'string' },
})
@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post()
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Create operator' })
  @ApiSecurity('authorization')
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorService.create(createOperatorDto);
  }

  @Get()
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Find all operators' })
  @ApiSecurity('authorization')
  findAll() {
    return this.operatorService.findAll();
  }

  @Get(':id')
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Route to be implemented: Find operator by id' })
  @ApiSecurity('authorization')
  findOne(@Param('id') id: string) {
    return this.operatorService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Route to be implemented: Update operator' })
  @ApiSecurity('authorization')
  update(
    @Param('id') id: string,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return this.operatorService.update(+id, updateOperatorDto);
  }

  @Delete(':id')
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Route to be implemented: Delete operator' })
  @ApiSecurity('authorization')
  remove(@Param('id') id: string) {
    return this.operatorService.remove(+id);
  }
}
