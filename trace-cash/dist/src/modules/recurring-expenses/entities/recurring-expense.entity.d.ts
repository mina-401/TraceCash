import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateRecurringExpenseDto } from '../dto/create-recurring-expense.dto';
import { UpdateRecurringExpenseDto } from '../dto/update-recurring-expense.dto';
export declare class RecurringExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateRecurringExpenseDto): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        userId: string;
        name: string;
        id: string;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(userId: string): import("@prisma/client").Prisma.PrismaPromise<{
        userId: string;
        name: string;
        id: string;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        userId: string;
        name: string;
        id: string;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateRecurringExpenseDto): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        userId: string;
        name: string;
        id: string;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__RecurringExpenseClient<{
        userId: string;
        name: string;
        id: string;
        categoryId: string | null;
        amount: number;
        frequency: import("@prisma/client").$Enums.Frequency;
        interval: number;
        dayOfMonth: number | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
