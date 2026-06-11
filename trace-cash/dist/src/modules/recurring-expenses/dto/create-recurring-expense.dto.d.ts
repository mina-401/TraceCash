import { Frequency } from '@prisma/client';
export declare class CreateRecurringExpenseDto {
    categoryId?: string;
    name: string;
    amount: number;
    frequency: Frequency;
    interval?: number;
    dayOfMonth?: number;
    startDate: string;
    endDate?: string;
    constructor(name: string, amount: number, frequency: Frequency, startDate: string, categoryId?: string, interval?: number, dayOfMonth?: number, endDate?: string);
}
