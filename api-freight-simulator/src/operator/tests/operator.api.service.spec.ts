import { MongoClient, Db, Collection } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorApiService } from '../operator.api.service';
import { operatorToCreateMock } from '../mocks/operator';

describe('OperatorApiService', () => {
  let service: OperatorApiService;
  let db: Db;
  let collection: Collection;
  let client: MongoClient;

  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__);
    await client.connect();
    db = client.db();
    collection = db.collection('operator');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorApiService,
        {
          provide: 'MONGO_CLIENT',
          useValue: client,
        },
      ],
    }).compile();

    service = module.get<OperatorApiService>(OperatorApiService);
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await collection.drop();
    await client.close();
  });

  describe('create', () => {
    it('should create operator in db', async () => {
      const response = await service.create(operatorToCreateMock);

      const insertedDoc = await collection.findOne({
        _id: response.insertedId,
      });
      expect(insertedDoc).toEqual({
        ...operatorToCreateMock,
        _id: response.insertedId,
        createdAt: expect.any(Date),
      });
    });
  });
});
