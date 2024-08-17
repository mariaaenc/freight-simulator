import { Operator } from '@/operator/entities/operator.entity';

export class FreightSimulation {
  customerId: string;
  originZipCode: string;
  destinationZipCode: string;
  height: number;
  width: number;
  length: number;
  createdAt: Date;
  operatorsResult: Partial<Operator>[];
}
