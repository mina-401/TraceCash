import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { RecurringExpensesModule } from './recurring-expenses/recurring-expenses.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExpenseInstancesModule } from './expense-instances/expense-instances.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule, CategoriesModule, RecurringExpensesModule, SchedulerModule, ExpenseInstancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
