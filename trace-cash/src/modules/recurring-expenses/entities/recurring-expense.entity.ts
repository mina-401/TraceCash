import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateRecurringExpenseDto } from '../dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from '../dto/update-recurring-expense.dto';

@Injectable()
export class RecurringExpensesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRecurringExpenseDto) {
    const { startDate, endDate, ...rest } = dto;
    return this.prisma.recurringExpense.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });
  }

  findAll() {
    return this.prisma.recurringExpense.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.recurringExpense.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`RecurringExpense ${id} not found`);
    return item;
  }

  update(id: string, dto: UpdateRecurringExpenseDto) {
    const { startDate, endDate, ...rest } = dto;
    return this.prisma.recurringExpense.update({
      where: { id },
      data: {
        ...rest,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.recurringExpense.delete({ where: { id } });
  }
}
