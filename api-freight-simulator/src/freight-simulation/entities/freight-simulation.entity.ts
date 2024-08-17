import { Operator } from '@/app.types';

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
