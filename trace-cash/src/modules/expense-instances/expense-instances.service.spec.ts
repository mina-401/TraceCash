import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseInstancesService } from './expense-instances.service';

describe('ExpenseInstancesService', () => {
  let service: ExpenseInstancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseInstancesService],
    }).compile();

    service = module.get<ExpenseInstancesService>(ExpenseInstancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
