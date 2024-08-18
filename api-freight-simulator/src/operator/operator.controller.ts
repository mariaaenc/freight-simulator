import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';

@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post()
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Create operator' })
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorService.create(createOperatorDto);
  }

  @Get()
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Find all operators' })
  findAll() {
    return this.operatorService.findAll();
  }

  @Get(':id')
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Route to be implemented: Find operator by id' })
  findOne(@Param('id') id: string) {
    return this.operatorService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Route to be implemented: Update operator' })
  update(
    @Param('id') id: string,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return this.operatorService.update(+id, updateOperatorDto);
  }

  @Delete(':id')
  @ApiTags('Operator')
  @ApiOperation({ summary: 'Route to be implemented: Delete operator' })
  remove(@Param('id') id: string) {
    return this.operatorService.remove(+id);
  }
}
