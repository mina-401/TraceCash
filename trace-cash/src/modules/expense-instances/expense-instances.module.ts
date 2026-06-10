import { Module } from '@nestjs/common';
import { ExpenseInstancesService } from './expense-instances.service';
import { ExpenseInstancesController } from './expense-instances.controller';

@Module({
  controllers: [ExpenseInstancesController],
  providers: [ExpenseInstancesService],
})
export class ExpenseInstancesModule {}
