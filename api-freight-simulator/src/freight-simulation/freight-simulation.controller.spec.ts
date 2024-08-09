import { Test, TestingModule } from '@nestjs/testing';
import { FreightSimulationController } from './freight-simulation.controller';
import { FreightSimulationService } from './freight-simulation.service';

describe('FreightSimulationController', () => {
  let controller: FreightSimulationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreightSimulationController],
      providers: [FreightSimulationService],
    }).compile();

    controller = module.get<FreightSimulationController>(
      FreightSimulationController,
    );
  });

  it('should create and return simulation', () => {
    expect(controller).toBeDefined();
    const response = controller.create({
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
