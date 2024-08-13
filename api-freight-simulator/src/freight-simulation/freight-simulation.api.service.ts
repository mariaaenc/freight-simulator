import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';
import { FreightSimulation } from './entities/freight-simulation.entity';

@Injectable()
export class FreightSimulationApiService {
  private db: Db;
  private collection: Collection;

  constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {
    this.db = this.client.db('logistics_operations');
    this.collection = this.db.collection('freight_imulation');
  }

  async create(
    data: Partial<FreightSimulation>,
  ): Promise<InsertOneResult<Document>> {
    return this.collection.insertOne({
      customerId: data.customerId,
      originZipCode: data.originZipCode,
      destinationZipCode: data.destinationZipCode,
      height: data.height,
      width: data.width,
      length: data.length,
      createdAt: new Date(),
      operatorsResult: data.operatorsResult,
    });
  }
}
