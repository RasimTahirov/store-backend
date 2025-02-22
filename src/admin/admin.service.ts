import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllUser() {
    const user = await this.prismaService.user.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });

    return user;
  }

  public async createCategory(name: string) {
    const category = await this.prismaService.category.findFirst({
      where: {
        name,
      },
    });

    if (category) throw new ConflictException(`Категория с названием ${name} уже существует`);

    const newCategory = await this.prismaService.category.create({
      data: { name },
    });
    console.log('newCategory', newCategory);

    return newCategory;
  }
}
