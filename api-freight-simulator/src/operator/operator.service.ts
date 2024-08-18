import { Injectable } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorApiService } from './operator.api.service';
import { Operator } from './entities/operator.entity';

@Injectable()
export class OperatorService {
  constructor(private readonly operatorApiService: OperatorApiService) {}
  create(createOperatorDto: CreateOperatorDto) {
    return this.operatorApiService.create(createOperatorDto);
  }

  findAll(): Promise<Operator[]> {
    return this.operatorApiService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} operator`;
  }

  update(id: number, updateOperatorDto: UpdateOperatorDto) {
    return `This action updates a #${id} operator, ${JSON.stringify(updateOperatorDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} operator`;
  }
}
