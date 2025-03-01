import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserData(req: Request) {
    const user = await req.cookies['user'];

    console.log('userData', user);

    if (!user) throw new BadRequestException('Нет данных');

    return user;
  }

  async getAllCategory() {
    const categories = await this.prismaService.category.findMany();

    return categories;
  }

  async getCategoryById(url: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        url,
      },
      include: {
        products: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!category) throw new BadRequestException('Категория не найдена');

    return category;
  }

  public checkAuthStatus() {
    return true;
  }
}
