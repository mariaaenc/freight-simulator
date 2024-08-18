import { Test, TestingModule } from '@nestjs/testing';
import { OperatorController } from '../operator.controller';
import { OperatorService } from '../operator.service';
import { operatorToCreateMock } from '../mocks/operator';

describe('OperatorController', () => {
  let controller: OperatorController;
  const createOperatorMock = jest.fn();
  const findAllOperatorMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorController],
      providers: [
        {
          provide: OperatorService,
          useValue: {
            create: createOperatorMock,
            findAll: findAllOperatorMock,
          },
        },
      ],
    }).compile();

    controller = module.get<OperatorController>(OperatorController);
  });

  describe('create', () => {
    it('should create operator', async () => {
      createOperatorMock.mockReturnValueOnce({});
      const response = await controller.create(operatorToCreateMock);
      expect(createOperatorMock).toHaveBeenCalledWith(operatorToCreateMock);
      expect(response).toEqual({});
    });
  });

  describe('findAll', () => {
    it('should findAll operators', async () => {
      findAllOperatorMock.mockReturnValueOnce({});
      const response = await controller.findAll();
      expect(findAllOperatorMock).toHaveBeenCalledWith();
      expect(response).toEqual({});
    });
  });
});
