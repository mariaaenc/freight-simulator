import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';
import { FreightSimulation } from './entities/freight-simulation.entity';

@Injectable()
export class FreightSimulationApiService {
  private db: Db;
  private collection: Collection;

  constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {
    this.db = this.client.db();
    this.collection = this.db.collection('freight_simulation');
  }

  public async create(
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

  public async findAllByCustomer(id: string) {
    const simulations = await this.collection
      .find({ customerId: id })
      .toArray();
    return simulations.map(
      (item) =>
        new FreightSimulation({
          id: String(item._id),
          customerId: item.customerId,
          originZipCode: item.originZipCode,
          destinationZipCode: item.destinationZipCode,
          height: item.height,
          width: item.width,
          length: item.length,
          createdAt: item.createdAt,
          operatorsResult: item.operatorsResult,
        }),
    );
  }
}
