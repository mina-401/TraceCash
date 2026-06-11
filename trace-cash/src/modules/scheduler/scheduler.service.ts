import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { addMonths, addYears, addWeeks, setDate, endOfMonth } from 'date-fns';
import { RecurringExpense } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private prisma: PrismaService) {}

  // 다음 결제일로 한 주기 전진
  private advance(rule: RecurringExpense, date: Date): Date {
    if (rule.frequency === 'MONTHLY') return addMonths(date, rule.interval);
    if (rule.frequency === 'YEARLY') return addYears(date, rule.interval);
    return addWeeks(date, rule.interval);
  }

  // 규칙의 첫 번째 결제일 계산
  private getFirstDueDate(rule: RecurringExpense): Date {
    let due = new Date(rule.startDate);
    if (rule.frequency === 'MONTHLY' && rule.dayOfMonth) {
      due = setDate(due, rule.dayOfMonth);
      // startDate보다 앞으로 당겨졌으면 한 달 전진
      if (due < new Date(rule.startDate)) {
        due = this.advance(rule, due);
      }
    }
    return due;
  }

  @Interval(10000)
  async generateInstances() {
    const now = new Date();
    // 다음 달 말까지 미리 생성 (이번 달 + 다음 달 항상 보임)
    const horizon = endOfMonth(addMonths(now, 1));

    const rules = await this.prisma.recurringExpense.findMany({
      where: { isActive: true },
    });

    for (const rule of rules) {
      let due = this.getFirstDueDate(rule);

      while (due <= horizon) {
        if (rule.endDate && due > new Date(rule.endDate)) break;

        await this.prisma.expenseInstance.upsert({
          where: { recurringId_dueDate: { recurringId: rule.id, dueDate: due } },
          update: {},
          create: {
            recurringId: rule.id,
            amount: rule.amount,
            dueDate: due,
            status: 'PENDING',
          },
        });

        due = this.advance(rule, due);
      }
    }

    this.logger.log(`인스턴스 생성 완료: 규칙 ${rules.length}개 / ${horizon.toISOString().split('T')[0]}까지`);
  }
}
