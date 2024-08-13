import { MongoClient } from 'mongodb';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const mongoClientProvider = {
  provide: 'MONGO_CLIENT',
  useFactory: async () => {
    const configService: ConfigService = new ConfigService();

    const mongoURI = configService.get<string>('MONGO_DB_URI');

    const mongoClient = new MongoClient(mongoURI);

    try {
      await mongoClient.connect();
      console.info('Success to connect mongodb.');
    } catch (error) {
      console.error(`Failed to connect mongodb. Error: ${error}`);
    }

    return mongoClient;
  },
};

@Global()
@Module({
  providers: [mongoClientProvider],
  exports: [mongoClientProvider],
})
export class MongoModule {}
