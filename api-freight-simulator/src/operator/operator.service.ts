import { Injectable } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorApiService } from './operator.api.service';

@Injectable()
export class OperatorService {
  constructor(private readonly operatorApiService: OperatorApiService) {}
  create(createOperatorDto: CreateOperatorDto) {
    return this.operatorApiService.create(createOperatorDto);
  }

  findAll() {
    return `This action returns all operator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operator`;
  }

  update(id: number, updateOperatorDto: UpdateOperatorDto) {
    return `This action updates a #${id} operator, ${updateOperatorDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} operator`;
  }
}
