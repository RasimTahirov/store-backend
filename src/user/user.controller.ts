import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paginationService: PaginationService
  ) {}

  @Get('products/man')
  @ApiOperation({ summary: 'Получение последних мужских товаров' })
  @ApiResponse({
    status: 200,
    description: 'Данные товаров',
    schema: {
      example: {
        id: '05edfdcc-fd78-4fd7-89c6-acd28f993945',
        title: 'Толстовка с воротником на молнии',
        description: null,
        price: 4199,
        size: 'S',
        color: 'Тёмно-коричневый',
        gender: 'MALE',
        images: [
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/99790819-a764-4430-9df6-8c0ad16787a1.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/d29fda9c-02e5-4621-bff5-93e54f04a1b5.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/14421d42-d804-4b40-892c-f1bdd5fa51f7.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/f63a79df-a191-4db6-8e5d-d9043657a0c4.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/8474d2df-9d79-4ab1-a0dc-f917e5ad60ef.webp',
        ],
        compound: '100% хлопок',
        country: 'Китай',
        care: 'Бережная стирка при максимальной температуре 30ºС, Не отбеливать, Машинная сушка запрещена, Глажение при 110ºС, Профессиональная сухая чистка. Мягкий режим.',
        createdAt: '2025-03-09T19:41:19.537Z',
        updatedAt: '2025-03-09T19:41:19.537Z',
        categoryId: 'e57e8ab3-9aed-4381-ba48-b2079962efbf',
        Category: {
          id: 'e57e8ab3-9aed-4381-ba48-b2079962efbf',
          name: 'Толстовки',
          url: 'man-sweatshirts',
          gender: 'MALE',
          createdAt: '2025-03-09T19:39:05.207Z',
          updatedAt: '2025-03-09T19:39:05.207Z',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getLastManProduct() {
    return this.userService.getLastManProduct();
  }

  @Get('products/woman')
  @ApiOperation({ summary: 'Получение последних жениских товаров' })
  @ApiResponse({
    status: 200,
    description: 'Данные товаров',
    schema: {
      example: {
        id: '11728f1a-3c1a-4be7-b989-c194f3de818c',
        title: 'Джинсы straight с высокой посадкой',
        description: null,
        price: 3999,
        size: 'XS',
        color: 'Индиго',
        gender: 'FEMALE',
        images: [
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/39c46ff8-1f94-458f-8765-4de302000d70.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/731bddd7-fe4e-4e0a-bb02-4cd1c3996743.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/116dda4a-9811-4401-94bc-c744dfc216d6.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/8ad61545-4a56-482e-af32-378d21e0600a.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1d46aef4-cfd3-4308-93a5-5273a07e3d4e.webp',
        ],
        compound: '70% вискоза, 30% полиамид',
        country: 'Китай',
        care: 'Ручная стирка в холодной воде, Не отбеливать, Машинная сушка запрещена, Глажение при 110ºС, Сухая чистка запрещена',
        createdAt: '2025-03-10T12:23:50.671Z',
        updatedAt: '2025-03-10T12:23:50.671Z',
        categoryId: '7fe88441-a58a-49d9-84f0-e3a5d6aca8bb',
        Category: {
          id: '7fe88441-a58a-49d9-84f0-e3a5d6aca8bb',
          name: 'Джинсы',
          url: 'woman-jeans',
          gender: 'FEMALE',
          createdAt: '2025-03-09T20:00:05.128Z',
          updatedAt: '2025-03-09T20:00:05.128Z',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getLastWomanProduct() {
    return this.userService.getLastWomanProduct();
  }

  @Get('data')
  @ApiOperation({ summary: 'Получение данных пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя',
    schema: {
      example: {
        id: '42bfcc02-4847-4d99-8362-6669bcc3964c',
        name: 'Имя',
        surname: 'Фамилия',
        email: 'test@test.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизированный пользователь',
    schema: {
      example: { message: 'Unauthorized' },
    },
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getUserData(@Req() req: Request) {
    return this.userService.getUserData(req);
  }

  // Не используется
  @Get('categories')
  @ApiExcludeEndpoint()
  getAllCategory() {
    return this.userService.getAllCategory();
  }

  @Get('categories/man')
  @ApiOperation({ summary: 'Получение мужских категорий' })
  @ApiResponse({
    status: 200,
    description: 'Категории мужских товаров',
    schema: {
      example: {
        id: '552e6099-4e9e-4508-ac23-56ed64ffd7f8',
        name: 'Рубашки',
        url: 'man-shirts',
        gender: 'MALE',
        createdAt: '2025-03-09T19:23:28.454Z',
        updatedAt: '2025-03-09T19:23:28.454Z',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getManCategories() {
    return this.userService.getManCategories();
  }

  @Get('categories/woman')
  @ApiOperation({ summary: 'Получение женских категорий' })
  @ApiResponse({
    status: 200,
    description: 'Категории женских товаров',
    schema: {
      example: {
        id: '8f4c97fd-353c-48ad-a139-58f9d335dc44',
        name: 'Платья',
        url: 'woman-dresses',
        gender: 'FEMALE',
        createdAt: '2025-03-09T19:59:50.956Z',
        updatedAt: '2025-03-09T19:59:50.956Z',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getWomanCategories() {
    return this.userService.getWomanCategories();
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Получение всех товаров по определенной категории' })
  @ApiParam({
    name: 'url',
    required: true,
    type: String,
    description: 'Название категории в URL',
    example: 'woman-dresses',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Номер страницы',
    schema: {
      example: 1,
    },
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Количество товров',
    schema: {
      example: 20,
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Данные товаров',
    schema: {
      example: {
        data: [
          {
            id: 'd6f24231-eebc-465e-9b8b-637f882d5d91',
            title: 'Вязаное вискозное платье с декоративным узлом',
            description: null,
            price: 6599,
            size: 'XS',
            color: 'Ягодный',
            gender: 'FEMALE',
            images: [
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/549b32ca-463e-40a2-a188-2785815d705a.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1e4fd4e0-662b-4ea7-be8c-7d2f282b7177.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/62412bc8-9f29-4dc4-8200-725fdc79d84d.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/6787865d-491e-4e33-b727-f7254dea8419.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1de35936-1529-4093-b8ed-d88d2c56a09f.webp',
            ],
          },
          {
            id: '4efb2e3f-a597-4d4b-9578-952bc84e3416',
            title: 'Вязаное платье миди длины из вискозы',
            description: null,
            price: 2999,
            size: 'XS',
            color: 'Молочный',
            gender: 'FEMALE',
            images: [
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/cd53a569-cbfd-4f49-be55-affe8841297e.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/b05b46c2-33c4-446d-a353-59290204ffe2.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/341307e2-8cf0-42ef-9f5c-94abbb6a8f78.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/4ebd2f68-2628-4c5a-9c53-ae5bcdd39bb7.webp',
              'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/eaf36bc8-7816-40f1-bd9d-3c6b836665da.webp',
            ],
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Категория с данным URL не найдена',
    schema: {
      example: { message: 'Категория не найдена' },
    },
  })
  @HttpCode(HttpStatus.OK)
  async getCategoryById(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
    const page = Number(paginationDto.page);
    const limit = Number(paginationDto.limit);

    const data = await this.userService.getCategoryById(id);
    const totalCount = data.products.length;

    return this.paginationService.paginate(data.products, totalCount, page, limit);
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Получение данных товара по ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID Товара',
    schema: {
      example: 'd6f24231-eebc-465e-9b8b-637f882d5d91',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Данные товара',
    schema: {
      example: {
        id: 'd6f24231-eebc-465e-9b8b-637f882d5d91',
        title: 'Вязаное вискозное платье с декоративным узлом',
        description: null,
        price: 6599,
        size: 'XS',
        color: 'Ягодный',
        gender: 'FEMALE',
        images: [
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/549b32ca-463e-40a2-a188-2785815d705a.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1e4fd4e0-662b-4ea7-be8c-7d2f282b7177.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/62412bc8-9f29-4dc4-8200-725fdc79d84d.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/6787865d-491e-4e33-b727-f7254dea8419.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1de35936-1529-4093-b8ed-d88d2c56a09f.webp',
        ],
        compound: '72% вискоза, 28% полиэстер',
        country: 'Китай',
        care: 'Ручная стирка в холодной воде, Не отбеливать, Машинная сушка запрещена, Глажение при 110ºС, Сухая чистка запрещена',
        createdAt: '2025-03-10T12:01:42.235Z',
        updatedAt: '2025-03-10T12:01:42.235Z',
        categoryId: '8f4c97fd-353c-48ad-a139-58f9d335dc44',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Данные товара не найдены',
    schema: {
      example: { message: 'Товар не найден' },
    },
  })
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id') id: string) {
    return this.userService.getProductById(id);
  }

  @Get('status')
  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  checkAuthStatus() {
    return this.userService.checkAuthStatus();
  }

  @Get('search')
  @ApiOperation({ summary: 'Поиск товара' })
  @ApiQuery({
    name: 'title',
    required: true,
    type: String,
    description: 'Название товара',
    example: 'Платье',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос на поиск товара',
    schema: {
      example: {
        id: 'd6f24231-eebc-465e-9b8b-637f882d5d91',
        title: 'Вязаное вискозное платье с декоративным узлом',
        description: null,
        price: 6599,
        size: 'XS',
        color: 'Ягодный',
        gender: 'FEMALE',
        images: [
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/549b32ca-463e-40a2-a188-2785815d705a.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1e4fd4e0-662b-4ea7-be8c-7d2f282b7177.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/62412bc8-9f29-4dc4-8200-725fdc79d84d.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/6787865d-491e-4e33-b727-f7254dea8419.webp',
          'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/1de35936-1529-4093-b8ed-d88d2c56a09f.webp',
        ],
        compound: '72% вискоза, 28% полиэстер',
        country: 'Китай',
        care: 'Ручная стирка в холодной воде, Не отбеливать, Машинная сушка запрещена, Глажение при 110ºС, Сухая чистка запрещена',
        createdAt: '2025-03-10T12:01:42.235Z',
        updatedAt: '2025-03-10T12:01:42.235Z',
        categoryId: '8f4c97fd-353c-48ad-a139-58f9d335dc44',
        Category: {
          id: '8f4c97fd-353c-48ad-a139-58f9d335dc44',
          name: 'Платья',
          url: 'woman-dresses',
          gender: 'FEMALE',
          createdAt: '2025-03-09T19:59:50.956Z',
          updatedAt: '2025-03-09T19:59:50.956Z',
        },
      },
    },
  })
  async search(@Query('title') title: string) {
    return this.userService.searchProductsByTitle(title);
  }
}
