import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async addToCart(dto: CreateCartDto, userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('Пользователь не найден');

    let cart = await this.prismaService.cart.findFirst({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await this.prismaService.cart.create({
        data: {
          userId: user.id,
        },
      });
    }

    const existingCartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: dto.productId,
      },
    });

    if (existingCartItem) {
      return this.prismaService.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + dto.quantity,
        },
      });
    } else {
      return this.prismaService.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });
    }
  }

  async deleteCart(productId: string, userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('Пользователь не найден');

    const cart = await this.prismaService.cart.findFirst({
      where: { userId: user.id },
    });

    if (!cart) throw new BadRequestException('Корзина не найдена');

    const cartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (!cartItem) throw new BadRequestException('Товар не найден в корзине');

    await this.prismaService.cartItem.delete({
      where: { id: cartItem.id },
    });

    return { message: 'Товар успешно удален из корзины' };
  }

  async getCartByUserId(userId: string) {
    const cart = await this.prismaService.cart.findFirst({
      where: { userId: userId },
      include: {
        CartItem: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalPrice = cart?.CartItem.reduce((total, item) => {
      if (item.product && item.product.price) {
        total += item.product.price * item.quantity;
      }
      return total;
    }, 0);

    return { cart: cart?.CartItem, totalPrice };
  }
}
