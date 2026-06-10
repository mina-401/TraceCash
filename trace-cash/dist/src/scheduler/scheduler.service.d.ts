import { PrismaService } from '../common/prisma/prisma.service';
export declare class SchedulerService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private getNextDueDate;
    generateInstances(): Promise<void>;
}
