import { ExpenseInstancesService } from './expense-instances.service';
export declare class ExpenseInstancesController {
    private readonly service;
    constructor(service: ExpenseInstancesService);
    findByPeriod(user: any, from: string, to: string): import("@prisma/client").Prisma.PrismaPromise<({
        recurring: {
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
        };
    } & {
        id: string;
        amount: number;
        createdAt: Date;
        recurringId: string;
        dueDate: Date;
        status: import("@prisma/client").$Enums.InstanceStatus;
    })[]>;
    markPaid(id: string): import("@prisma/client").Prisma.Prisma__ExpenseInstanceClient<{
        id: string;
        amount: number;
        createdAt: Date;
        recurringId: string;
        dueDate: Date;
        status: import("@prisma/client").$Enums.InstanceStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    skip(id: string): import("@prisma/client").Prisma.Prisma__ExpenseInstanceClient<{
        id: string;
        amount: number;
        createdAt: Date;
        recurringId: string;
        dueDate: Date;
        status: import("@prisma/client").$Enums.InstanceStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
