import { Test, TestingModule } from '@nestjs/testing';
import {
  freightSimulationsMock,
  FreightSimulationServiceMock,
} from './mocks/freight-simulation.mock';
import { FreightSimulationService } from './freight-simulation.service';
import { FreightSimulationController } from './freight-simulation.controller';

describe('FreightSimulationController', () => {
  let controller: FreightSimulationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreightSimulationController],
      providers: [
        {
          provide: FreightSimulationService,
          useClass: FreightSimulationServiceMock,
        },
      ],
    }).compile();

    controller = module.get<FreightSimulationController>(
      FreightSimulationController,
    );
  });

  it('should create and return simulation', () => {
    expect(controller).toBeDefined();
    const response = controller.create({
      originZipCode: '89222520',
      destinationZipCode: '01001000',
      height: 0,
      width: 0,
      length: 0,
    });
    expect(response).toEqual(freightSimulationsMock);
  });
});
