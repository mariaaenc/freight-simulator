import { MongoClient, Db, Collection } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationApiService } from '../freight-simulation.api.service';
import { freightSimulationMock } from '../mocks/freight-simulation.mock';
import { FreightSimulation } from '../entities/freight-simulation.entity';

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

  describe('findAllByCustomer', () => {
    it('should find all freight simulation by customer id', async () => {
      const freightSimulationInserted = await service.create(
        freightSimulationMock,
      );
      const response = await service.findAllByCustomer(
        freightSimulationMock.customerId,
      );
      expect(response).toEqual([
        new FreightSimulation({
          id: String(freightSimulationInserted.insertedId),
          customerId: 'customerId',
          originZipCode: '89222520',
          destinationZipCode: '01001000',
          height: 30,
          width: 20,
          length: 40,
          createdAt: expect.any(Date),
          operatorsResult: [
            {
              id: '1',
              name: 'Operador 1',
              totalCost: 'R$ 9,60',
              deliveryTime: 3,
              lowestCost: false,
              fastestDelivery: false,
            },
            {
              id: '2',
              name: 'Operador 2',
              totalCost: 'R$ 10,80',
              deliveryTime: 2,
              lowestCost: true,
              fastestDelivery: true,
            },
          ],
        }),
      ]);
    });

    it('should return empty array when customer not has simulations', async () => {
      const response = await service.findAllByCustomer('');
      expect(response).toEqual([]);
    });
  });
});
