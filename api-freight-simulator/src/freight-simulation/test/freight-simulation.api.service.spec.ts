import { MongoClient, Db, Collection } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationApiService } from '../freight-simulation.api.service';
import { freightSimulationMock } from '../mocks/freight-simulation.mock';

describe('FreightSimulationApiService', () => {
  let service: FreightSimulationApiService;
  let db: Db;
  let collection: Collection;
  let client: MongoClient;

  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__);
    await client.connect();
    db = client.db();
    collection = db.collection('freight_simulation');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FreightSimulationApiService,
        {
          provide: 'MONGO_CLIENT',
          useValue: client,
        },
      ],
    }).compile();

    service = module.get<FreightSimulationApiService>(
      FreightSimulationApiService,
    );
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await collection.drop();
    await client.close();
  });

  describe('create', () => {
    it('should create freight simulation in db', async () => {
      const response = await service.create(freightSimulationMock);

      const insertedDoc = await collection.findOne({
        _id: response.insertedId,
      });
      expect(insertedDoc).toEqual({
        ...freightSimulationMock,
        _id: response.insertedId,
        createdAt: expect.any(Date),
      });
    });
  });
});
