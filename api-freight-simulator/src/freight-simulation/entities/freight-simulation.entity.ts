import { Operator } from '@/operator/entities/operator.entity';

export class FreightSimulation {
  id: string;
  customerId: string;
  originZipCode: string;
  destinationZipCode: string;
  height: number;
  width: number;
  length: number;
  createdAt: Date;
  operatorsResult: Partial<Operator>[];

  constructor(data: FreightSimulation) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.originZipCode = data.originZipCode;
    this.destinationZipCode = data.destinationZipCode;
    this.height = data.height;
    this.width = data.width;
    this.length = data.length;
    this.createdAt = data.createdAt;
    this.operatorsResult = data.operatorsResult;
  }
}
