import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseInstancesService } from './expense-instances.service';
import { CreateExpenseInstanceDto } from './dto/create-expense-instance.dto';
import { UpdateExpenseInstanceDto } from './dto/update-expense-instance.dto';

@Controller('expense-instances')
export class ExpenseInstancesController {
  constructor(private readonly expenseInstancesService: ExpenseInstancesService) {}

  @Post()
  create(@Body() createExpenseInstanceDto: CreateExpenseInstanceDto) {
    return this.expenseInstancesService.create(createExpenseInstanceDto);
  }

  @Get()
  findAll() {
    return this.expenseInstancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseInstancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseInstanceDto: UpdateExpenseInstanceDto) {
    return this.expenseInstancesService.update(+id, updateExpenseInstanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseInstancesService.remove(+id);
  }
}
