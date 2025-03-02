import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/types/type';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { S3Service } from 'src/s3/s3.service';
import { createCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service
  ) {}

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

  public async deleteUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException('Пользователь не найден');

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return { message: 'Пользователь удалён' };
  }

  public async createCategory(dto: createCategoryDto) {
    const category = await this.prismaService.category.findFirst({
      where: {
        AND: [{ name: dto.name }, { gender: dto.gender }],
      },
    });

    if (category) throw new ConflictException(`Категория с названием ${dto.name} уже существует`);

    const newCategory = await this.prismaService.category.create({
      data: {
        name: dto.name,
        url: dto.url,
        gender: dto.gender,
      },
    });

    return newCategory;
  }

  public async createProduct(dto: CreateProductDto, files: Express.Multer.File[]) {
    const imageUrls = await Promise.all(
      files.map(async file => {
        return this.s3Service.upload(file.buffer, file.originalname, file.mimetype);
      })
    );

    const price = parseFloat(dto.price);

    const product = await this.prismaService.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: price,
        size: dto.size,
        color: dto.color,
        categoryId: dto.category,
        gender: dto.gender,
        image: imageUrls,
      },
    });

    return product;
  }

  public async getAllProducts() {
    const product = await this.prismaService.product.findMany();

    return product;
  }

  public async deleteProduct(id: string) {
    try {
      await this.prismaService.product.delete({
        where: {
          id,
        },
      });

      return { message: 'Товар удалён' };
    } catch {
      throw new BadRequestException('Товар не найден');
    }
  }
}
