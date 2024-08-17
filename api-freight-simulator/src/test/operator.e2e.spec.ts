import * as request from 'supertest';
import { Collection, Db, MongoClient } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { operatorToCreateMock } from '@/operator/mocks/operator';
import { AppModule } from '@/app.module';

describe.skip('OperatorController (e2e)', () => {
  let app: INestApplication;
  let client: MongoClient;
  let collection: Collection;
  let db: Db;

  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__);
    await client.connect();
    db = client.db();
    collection = db.collection('operator');
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: 'MONGO_CLIENT',
          useValue: client,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
    await client.close();
  });

  it('/operator (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/operator')
      .send(operatorToCreateMock);

    expect(response.status).toEqual(201);

    const insertedDoc = await collection.findOne({
      _id: response.body.insertedId,
    });

    expect(insertedDoc).toEqual({
      ...operatorToCreateMock,
      _id: response.body.insertedId,
      createdAt: expect.any(Date),
    });
  });
});
