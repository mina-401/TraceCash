import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseInstancesController } from './expense-instances.controller';
import { ExpenseInstancesService } from './expense-instances.service';

describe('ExpenseInstancesController', () => {
  let controller: ExpenseInstancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseInstancesController],
      providers: [ExpenseInstancesService],
    }).compile();

    controller = module.get<ExpenseInstancesController>(ExpenseInstancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
