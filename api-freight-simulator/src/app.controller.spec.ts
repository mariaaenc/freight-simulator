import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('simulate', () => {
    it('should return simulations', () => {
      const response = appController.simulateFreight({
        originZipCode: '',
        destinationZipcode: '',
        height: 0,
        width: 0,
        length: 0,
      });
      expect(response).toEqual([
        {
          name: 'Operador 1',
          deliveryTime: 1,
          totalCost: 'R$ 9,60',
          fastestDelivery: true,
          lowestCost: true,
        },
        {
          name: 'Operador 2',
          deliveryTime: 1,
          totalCost: 'R$ 10,80',
          fastestDelivery: false,
          lowestCost: false,
        },
      ]);
    });
  });
});
