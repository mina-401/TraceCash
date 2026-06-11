import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createCategoryDto: CreateCategoryDto): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        userId: string | null;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(userId: string): import("@prisma/client").Prisma.PrismaPromise<{
        userId: string | null;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        userId: string | null;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        userId: string | null;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        userId: string | null;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
