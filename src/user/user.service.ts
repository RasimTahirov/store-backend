import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getLastManProduct() {
    const product = await this.prismaService.product.findMany({
      where: {
        gender: 'MALE',
      },
      take: 5,
      include: {
        Category: true,
      },
    });

    return product;
  }

  public async getLastWomanProduct() {
    const product = await this.prismaService.product.findMany({
      where: {
        gender: 'FEMALE',
      },
      take: 5,
      include: {
        Category: true,
      },
    });

    return product;
  }

  public async getUserData(req: Request) {
    const user = await req.cookies['user'];

    if (!user) throw new BadRequestException('Нет данных');

    return user;
  }

  public async getAllCategory() {
    const categories = await this.prismaService.category.findMany();

    return categories;
  }

  public async getManCategories() {
    const categories = await this.prismaService.category.findMany({
      where: {
        gender: 'MALE',
      },
    });

    return categories;
  }

  public async getWomanCategories() {
    const categories = await this.prismaService.category.findMany({
      where: {
        gender: 'FEMALE',
      },
    });

    return categories;
  }

  public async getCategoryById(url: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        url,
      },
      include: {
        products: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            size: true,
            color: true,
            gender: true,
            images: true,
          },
        },
      },
    });

    if (!category) throw new BadRequestException('Категория не найдена');

    return category;
  }

  public async getProductById(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    console.log('test');

    return product;
  }

  public checkAuthStatus() {
    return true;
  }

  public async searchProductsByTitle(title: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      include: {
        Category: true,
      },
    });

    return products;
  }
}
