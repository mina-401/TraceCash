import { PrismaService } from '../../common/prisma/prisma.service';
export declare class ExpenseInstancesService {
    private prisma;
    constructor(prisma: PrismaService);
    findByPeriod(userId: string, from: string, to: string): import("@prisma/client").Prisma.PrismaPromise<({
        recurring: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        amount: number;
        recurringId: string;
        dueDate: Date;
        status: import("@prisma/client").$Enums.InstanceStatus;
    })[]>;
    markPaid(id: string): import("@prisma/client").Prisma.Prisma__ExpenseInstanceClient<{
        id: string;
        createdAt: Date;
        amount: number;
        recurringId: string;
        dueDate: Date;
        status: import("@prisma/client").$Enums.InstanceStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    skip(id: string): import("@prisma/client").Prisma.Prisma__ExpenseInstanceClient<{
        id: string;
        createdAt: Date;
        amount: number;
        recurringId: string;
        dueDate: Date;
        status: import("@prisma/client").$Enums.InstanceStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
