import { Injectable } from '@nestjs/common';
import { CreateExpenseInstanceDto } from './dto/create-expense-instance.dto';
import { UpdateExpenseInstanceDto } from './dto/update-expense-instance.dto';

@Injectable()
export class ExpenseInstancesService {
  create(createExpenseInstanceDto: CreateExpenseInstanceDto) {
    return 'This action adds a new expenseInstance';
  }

  findAll() {
    return `This action returns all expenseInstances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseInstance`;
  }

  update(id: number, updateExpenseInstanceDto: UpdateExpenseInstanceDto) {
    return `This action updates a #${id} expenseInstance`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseInstance`;
  }
}
