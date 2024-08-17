import { Test, TestingModule } from '@nestjs/testing';
import { OperatorService } from '../operator.service';
import { OperatorApiService } from '../operator.api.service';
import { operatorToCreateMock } from '../mocks/operator';

describe('OperatorService', () => {
  let service: OperatorService;
  const createOperatorMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorService,
        {
          provide: OperatorApiService,
          useValue: {
            create: createOperatorMock,
          },
        },
      ],
    }).compile();

    service = module.get<OperatorService>(OperatorService);
  });

  describe('create', () => {
    it('should create operator', async () => {
      createOperatorMock.mockReturnValueOnce({});
      const response = await service.create(operatorToCreateMock);
      expect(createOperatorMock).toHaveBeenCalledWith(operatorToCreateMock);
      expect(response).toEqual({});
    });
  });
});
