import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() dto: CreateCartDto, @Req() req) {
    const userId = req.user.userId;

    const cart = await this.cartService.addToCart(dto, userId);
    return { message: 'Товар успешно добавлен в корзину', cart };
  }

  @Delete('delete/:id')
  async deleteCart(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.cartService.deleteCart(id, userId);
  }

  @Get()
  async getCartByUserId(@Req() req) {
    const userId = req.user.userId;
    const cartItems = await this.cartService.getCartByUserId(userId);
    return { cartItems };
  }
}
