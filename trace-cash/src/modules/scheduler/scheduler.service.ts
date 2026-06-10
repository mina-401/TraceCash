import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { addMonths, addYears, addWeeks, setDate } from 'date-fns';
import { RecurringExpense } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private prisma: PrismaService) {}

  // 주어진 날짜(after) 이후의 다음 결제일을 계산
  private getNextDueDate(rule: RecurringExpense, after: Date): Date {
    let due = new Date(rule.startDate);
    if (rule.frequency === 'MONTHLY' && rule.dayOfMonth) {
      due = setDate(due, rule.dayOfMonth);
    }
    while (due <= after) {
      if (rule.frequency === 'MONTHLY') due = addMonths(due, rule.interval);
      else if (rule.frequency === 'YEARLY') due = addYears(due, rule.interval);
      else due = addWeeks(due, rule.interval); // WEEKLY
    }
    return due;
  }

  @Interval(10000)
  async generateInstances() {
    const now = new Date();
    const rules = await this.prisma.recurringExpense.findMany({
      where: { isActive: true },
    });

    for (const rule of rules) {
      const dueDate = this.getNextDueDate(rule, now);
      if (rule.endDate && dueDate > rule.endDate) continue;

      await this.prisma.expenseInstance.upsert({
        where: {
          recurringId_dueDate: { recurringId: rule.id, dueDate },
        },
        update: {},
        create: {
          recurringId: rule.id,
          amount: rule.amount,
          dueDate,
          status: 'PENDING',
        },
      });
    }
    this.logger.log(`인스턴스 생성 완료: 규칙 ${rules.length}개 체크`);
  }
}