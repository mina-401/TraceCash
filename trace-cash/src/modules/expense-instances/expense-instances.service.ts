import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ExpenseInstancesService {
  constructor(private prisma: PrismaService) {}

  findByPeriod(userId: string, from: string, to: string) {
    return this.prisma.expenseInstance.findMany({
      where: {
        dueDate: { gte: new Date(from), lte: new Date(to) },
        recurring: { userId },
      },
      include: { recurring: true },
      orderBy: { dueDate: 'asc' },
    });
  }

  markPaid(id: string) {
    return this.prisma.expenseInstance.update({
      where: { id },
      data: { status: 'PAID' },
    });
  }

  skip(id: string) {
    return this.prisma.expenseInstance.update({
      where: { id },
      data: { status: 'SKIPPED' },
    });
  }
}