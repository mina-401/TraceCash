import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateRecurringExpenseDto } from '../dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from '../dto/update-recurring-expense.dto';
export declare class RecurringExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRecurringExpenseDto): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
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
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
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
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
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
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
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
