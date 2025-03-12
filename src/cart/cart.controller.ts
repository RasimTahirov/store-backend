import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Получение товаров в корзине' })
  @ApiResponse({
    status: 200,
    description:
      'Возвращает список товаров, добавленных пользователем в корзину. Каждый товар включает информацию о продукте, количестве и другие детали',
    schema: {
      example: {
        cart: [
          {
            id: 'd108c9c8-8283-4b3a-aac4-b9936822d83d',
            cartId: '27c3bc52-e084-4386-bf15-ef5c0f38afe8',
            productId: '0debc920-2af4-4fdf-879e-9f267ca42199',
            quantity: 1,
            createdAt: '2025-03-12T11:00:24.027Z',
            updatedAt: '2025-03-12T11:00:24.027Z',
            product: {
              id: '0debc920-2af4-4fdf-879e-9f267ca42199',
              title: 'Фланелевая рубашка с принтом',
              description: null,
              price: 1399,
              size: 'L',
              color: 'Серый',
              gender: 'MALE',
              images: [
                'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/5006e30b-d743-4e1f-a036-1a521bceac44.webp',
                'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/e5d50101-ef46-479e-bbed-0d02cb1a9ce2.webp',
                'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/b5ffb1bd-b1ad-44d6-8621-b1888e9f7a63.webp',
                'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/ae29384a-4aa2-4fac-b8c7-b200c7cbf5d8.webp',
                'https://0c37b125-144e-483b-b6e5-8b8b2d445410.selstorage.ru/bf7307ef-2e71-4a1f-a431-8adc838869ae.webp',
              ],
              compound: '100% хлопок',
              country: 'Китай',
              care: 'Бережная стирка при максимальной температуре 30ºС, Не отбеливать, Машинная сушка запрещена, Глажение при 110ºС, Профессиональная сухая чистка. Мягкий режим.',
              createdAt: '2025-03-09T19:34:22.346Z',
              updatedAt: '2025-03-09T19:34:22.346Z',
              categoryId: '552e6099-4e9e-4508-ac23-56ed64ffd7f8',
            },
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async getCartByUserId(@Req() req) {
    const userId = req.user.userId;
    const cartItems = await this.cartService.getCartByUserId(userId);
    return { cartItems };
  }

  @Post('add')
  @ApiOperation({ summary: 'Добавление товара в корзину' })
  @ApiBody({
    description: 'Данные о товаре',
    schema: {
      example: {
        productId: '11728f1a-3c1a-4be7-b989-c194f3de818c',
        quantity: 1,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Успешный запрос на добавление товара в корзину',
    schema: {
      example: {
        message: 'Товар успешно добавлен в корзину',
        cart: {
          id: 'ff737059-3a84-419b-bbb0-a47df90a8e8a',
          cartId: '27c3bc52-e084-4386-bf15-ef5c0f38afe8',
          productId: '11728f1a-3c1a-4be7-b989-c194f3de818c',
          quantity: 1,
          createdAt: '2025-03-12T11:07:47.150Z',
          updatedAt: '2025-03-12T11:07:47.150Z',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Body() dto: CreateCartDto, @Req() req) {
    const userId = req.user.userId;

    const cart = await this.cartService.addToCart(dto, userId);
    return { message: 'Товар успешно добавлен в корзину', cart };
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Удаление товара из корзины' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID Товара',
    example: '11728f1a-3c1a-4be7-b989-c194f3de818c',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос на удаление товара из корзины',
    example: { message: 'Товар успешно удален из корзины' },
  })
  @ApiResponse({
    status: 400,
    description: 'Товара нет в корзине',
    example: { message: 'Товар не найден в корзине' },
  })
  async deleteCart(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.cartService.deleteCart(id, userId);
  }
}
