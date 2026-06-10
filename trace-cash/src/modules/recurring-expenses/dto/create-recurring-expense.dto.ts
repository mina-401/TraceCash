import { IsString, IsNotEmpty, IsInt, IsPositive, IsEnum, IsOptional, IsDateString, Min, Max } from 'class-validator';
import { Frequency } from '@prisma/client';

export class CreateRecurringExpenseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsEnum(Frequency)
  frequency: Frequency;

  @IsInt()
  @Min(1)
  @IsOptional()
  interval?: number;

  @IsInt()
  @Min(1)
  @Max(31)
  @IsOptional()
  dayOfMonth?: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  constructor(
    userId: string,
    name: string,
    amount: number,
    frequency: Frequency,
    startDate: string,
    categoryId?: string,
    interval?: number,
    dayOfMonth?: number,
    endDate?: string,
    ) {
    this.userId = userId;
    this.categoryId = categoryId;
    this.name = name;
    this.amount = amount;
    this.frequency = frequency;
    this.interval = interval;
    this.dayOfMonth = dayOfMonth;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}