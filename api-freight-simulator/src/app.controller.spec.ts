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
      expect(
        appController.simulateFreight({
          originZipCode: '',
          destinationZipcode: '',
          height: 0,
          width: 0,
          length: 0,
        }),
      ).toBe('Hello World!');
    });
  });
});
