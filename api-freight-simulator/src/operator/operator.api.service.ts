import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';
import { Operator } from './entities/operator.entity';

@Injectable()
export class OperatorApiService {
  private db: Db;
  private collection: Collection;

  constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {
    this.db = this.client.db();
    this.collection = this.db.collection('operator');
  }

  async create(data: Partial<Operator>): Promise<InsertOneResult<Document>> {
    return this.collection.insertOne({
      name: data.name,
      divisor: data.divisor,
      freightInformation: data.freightInformation,
      createdAt: new Date(),
    });
  }
}
