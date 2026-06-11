import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  //의존성 주입
  constructor(private prisma: PrismaService) {}

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: {userId, ...createCategoryDto } });
  }

  findAll(userId: string) {
    return this.prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId }],
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}