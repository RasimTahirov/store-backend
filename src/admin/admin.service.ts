import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/types/type';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';

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

    return newCategory;
  }

  public async createProduct(dto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        size: dto.size,
        color: dto.color,
        categoryId: dto.category,
      },
    });

    return product;
  }
}
