import { Controller, Get, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ExpenseInstancesService } from './expense-instances.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('expense-instances')
export class ExpenseInstancesController {
  constructor(private readonly service: ExpenseInstancesService) {}

  @Get()
  findByPeriod(
    @CurrentUser() user,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.service.findByPeriod(user.userId, from, to);
  }

  @Patch(':id/pay')
  markPaid(@Param('id') id: string) {
    return this.service.markPaid(id);
  }

  @Patch(':id/skip')
  skip(@Param('id') id: string) {
    return this.service.skip(id);
  }
}