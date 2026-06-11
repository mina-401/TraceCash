import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { CommonModule } from './common/common.module';
import { RecurringExpensesModule } from './modules/recurring-expenses/recurring-expenses.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExpenseInstancesModule } from './modules/expense-instances/expense-instances.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CommonModule, CategoriesModule, RecurringExpensesModule, SchedulerModule, ExpenseInstancesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
