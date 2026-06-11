import { RecurringExpensesService } from './recurring-expenses.service';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';
export declare class RecurringExpensesController {
    private readonly service;
    constructor(service: RecurringExpensesService);
    create(user: any, dto: CreateRecurringExpenseDto): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateRecurringExpenseDto): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
