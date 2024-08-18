import { MongoClient, Db, Collection } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorApiService } from '../operator.api.service';
import {
  freightInformationMock,
  operatorToCreateMock,
} from '../mocks/operator';
import { Operator } from '../entities/operator.entity';

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

  describe('findAll', () => {
    it('should return empty array when not has operators', async () => {
      const response = await service.findAll();
      expect(response).toEqual([]);
    });

    it('should return array with operators', async () => {
      const [operator1, operator2] = await Promise.all([
        service.create(operatorToCreateMock),
        service.create({
          ...operatorToCreateMock,
          name: 'other operator',
          divisor: 3000,
        }),
      ]);
      const response = await service.findAll();
      const expectedResponse = [
        new Operator({
          id: String(operator1.insertedId),
          name: 'Operador 1',
          divisor: 5000,
          freightInformation: freightInformationMock,
        }),
        new Operator({
          id: String(operator2.insertedId),
          name: 'other operator',
          divisor: 3000,
          freightInformation: freightInformationMock,
        }),
      ];
      expect(response).toEqual(expectedResponse);
    });
  });
});
