import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Role } from 'src/auth/types/type';
import { RoleDecorator } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createCategoryDto } from './dto/createCategory.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly paginationService: PaginationService
  ) {}

  @Get('users')
  @ApiOperation({ summary: 'Получение списка всех пользователей' })
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
    description: 'Количество пользователей',
    schema: {
      example: 20,
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    schema: {
      example: {
        data: [
          {
            id: '8fb1e6fb-e49f-4d6f-8149-d9f797d5df3d',
            name: 'Имя',
            surname: 'Фамилия',
            email: 'test@test.com',
            password:
              '$argon2id$v=19$m=65536,t=3,p=4$FGZALbG6RFQoWpqzcIKDLA$Ev3NQ3oxnwCebT30bVeKm+SU/CBTjchVt5Q7MwxXemk',
            role: 'USER',
            createdAt: '2025-03-11T11:39:37.088Z',
            updatedAt: '2025-03-11T11:39:37.088Z',
          },
        ],
        meta: {
          totalPages: 1,
          currentPage: 1,
          totalCurrentItem: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
    schema: {
      example: { message: 'Forbidden resource' },
    },
  })
  @RoleDecorator(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async getAllUser(@Query() paginationDto: PaginationDto) {
    const page = Number(paginationDto.page);
    const limit = Number(paginationDto.limit);

    const data = await this.adminService.getAllUser();
    const totalCount = data.length;

    return this.paginationService.paginate(data, totalCount, page, limit);
  }

  // Не используется. Был создан для теста пагинации
  @Get('products')
  @ApiExcludeEndpoint()
  @RoleDecorator(Role.ADMIN)
  async getAllProducts(@Query() paginationDto: PaginationDto) {
    const data = await this.adminService.getAllProducts();
    const totalCount = data.length;
    return this.paginationService.paginate(
      data,
      totalCount,
      paginationDto.page,
      paginationDto.limit
    );
  }

  @Post('create/category')
  @ApiOperation({ summary: 'Создание категории товара' })
  @ApiBody({
    description: 'Описание категории товара. Включает имя, URL и пол категории',
    schema: {
      example: {
        name: 'Рубашки',
        url: 'man-shirts',
        gender: 'MALE',
      },
      required: ['name', 'url', 'gender'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Категория успешно создана',
    schema: {
      example: {
        id: '058a78f3-f388-4b63-b53e-f04b96c04d3a',
        name: 'Рубашки',
        url: 'man-shirts',
        gender: 'MALE',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Категория с таким названием или URL уже существует',
    schema: {
      example: { message: 'Категория с названием Рубашки уже существует' },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
    schema: {
      example: { message: 'Forbidden resource' },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @RoleDecorator(Role.ADMIN)
  async createCategory(@Body() dto: createCategoryDto) {
    return this.adminService.createCategory(dto);
  }

  @Post('create/product')
  @ApiOperation({ summary: 'Создание товара' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Информация о товаре',
    schema: {
      example: {
        title: 'Рубашка oxford в полоску',
        description: 'Optional',
        price: '3799',
        size: 'M',
        color: 'Серый',
        category: '552e6099-4e9e-4508-ac23-56ed64ffd7f8',
        gender: 'MALE',
        images: ['image1', 'image2', 'image3'],
        compound: '95% хлопок, 5% эластан',
        country: 'Узбекистан',
        care: 'Бережная стирка при максимальной температуре 30ºС, Не отбеливать, Сушка в расправленном виде, Глажение при 110ºС, Профессиональная сухая чистка. Мягкий режим.',
      },
      required: [
        'title',
        'price',
        'size',
        'color',
        'category',
        'gender',
        'images',
        'compound',
        'country',
        'care',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Товар успешно создан',
    schema: {
      example: {
        id: '7b5a5317-5681-4d3e-b13e-a52c7b7e87f8',
        title: 'Рубашка oxford в полоску',
        price: 3799,
        size: 'M',
        color: 'Серый',
        gender: 'MALE',
        images: ['image1', 'image2', 'image3'],
        compound: '95% хлопок, 5% эластан',
        country: 'Узбекистан',
        care: 'Бережная стирка при максимальной температуре 30ºС, Не отбеливать, Сушка в расправленном виде, Глажение при 110ºС, Профессиональная сухая чистка. Мягкий режим.',
        createdAt: '2025-03-11T20:56:30.790Z',
        updatedAt: '2025-03-11T20:56:30.790Z',
        categoryId: '552e6099-4e9e-4508-ac23-56ed64ffd7f8',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
    schema: {
      example: { message: 'Forbidden resource' },
    },
  })
  @UseInterceptors(FilesInterceptor('images'))
  @HttpCode(HttpStatus.CREATED)
  @RoleDecorator(Role.ADMIN)
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.adminService.createProduct(dto, files);
  }

  @Put('user/update/:id')
  @ApiOperation({ summary: 'Обновление роли пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID пользователя для обновления роли',
    example: 'bd6cb920-2afd-4a9a-a016-dce205ee3d37',
  })
  @ApiBody({
    description: 'Новая роль пользователя',
    schema: {
      example: { role: 'ADMIN' },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос на изменение роли',
    schema: {
      example: {
        message: 'Роль пользователя обновлена',
        update: {
          id: 'd1f87e34-0eaa-4188-b664-dc402b2a618a',
          name: 'Имя',
          surname: 'Фамилия',
          email: 'test@test.com',
          password:
            '$argon2id$v=19$m=65536,t=3,p=4$Os/MvmZgKtIqLQnPoZXJOQ$JAmuo+9KWZDxRfjY0OMC0UXrLuJbsgBcxi8jL3Ei9KA',
          role: 'ADMIN',
          createdAt: '2025-03-09T19:00:26.270Z',
          updatedAt: '2025-03-11T21:13:01.611Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь с таким ID не найден',
    schema: {
      example: { message: 'Пользователь не найден' },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
    schema: {
      example: { message: 'Forbidden resource' },
    },
  })
  @HttpCode(HttpStatus.OK)
  @RoleDecorator(Role.ADMIN)
  async upadtedRole(@Param('id') id: string, @Body() body: { role: Role }) {
    return this.adminService.upadtedRole(id, body.role);
  }

  @Delete('product/:id')
  @ApiOperation({ summary: 'Удаление товара' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID товара для удаления',
    example: 'bd6cb920-2afd-4a9a-a016-dce205ee3d37',
  })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удалён',
    schema: {
      example: { message: 'Товар удалён' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Товар с таким ID не найден',
    schema: {
      example: { message: 'Товар не найден' },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
    schema: {
      example: { message: 'Forbidden resource' },
    },
  })
  @HttpCode(HttpStatus.OK)
  @RoleDecorator(Role.ADMIN)
  async deleteProduct(@Param('id') id: string) {
    return this.adminService.deleteProduct(id);
  }

  @Delete('user/:id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID пользователя для удаления',
    example: 'bd6cb920-2afd-4a9a-a016-dce205ee3d37',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удален',
    schema: {
      example: { message: 'Пользователь удалён' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь с таким ID не найден',
    schema: {
      example: { message: 'Пользователь не найден' },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
    schema: {
      example: { message: 'Forbidden resource' },
    },
  })
  @HttpCode(HttpStatus.OK)
  @RoleDecorator(Role.ADMIN)
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }
}
