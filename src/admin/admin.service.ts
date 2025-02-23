import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/types/type';
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

  public async upadtedRole(id: string, role: Role) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException('Пользователь не найден');

    const update = await this.prismaService.user.update({
      where: { id },
      data: { role },
    });

    return { message: 'Роль пользователя обновлена', update };
  }

  public async createCategory(name: string) {
    const category = await this.prismaService.category.findFirst({
      where: { name },
    });

    if (category) throw new ConflictException(`Категория с названием ${name} уже существует`);

    const newCategory = await this.prismaService.category.create({
      data: { name },
    });
    console.log('newCategory', newCategory);

    return newCategory;
  }
}
