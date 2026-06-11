import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(user: any, dto: CreateCategoryDto): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        userId: string;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<{
        userId: string;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        userId: string;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }>;
    update(id: string, dto: UpdateCategoryDto): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        userId: string;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        userId: string;
        name: string;
        domain: string;
        isEssential: boolean;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
