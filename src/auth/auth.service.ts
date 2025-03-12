import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ONE_MONTH } from './utils/date.utils';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: RegisterDto) {
    const isExists = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (isExists)
      throw new ConflictException(`Пользователь с данным email ${dto.email} уже существует`);

    if (dto.passwordRepeat !== dto.password) throw new BadRequestException('Пароли не совпадают');

    const hashedPassword = await argon2.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return user;
  }

  public async login(dto: LoginDto, res: Response) {
    const user = await this.prismaService.user.findUnique({ where: { email: dto.email } });

    if (!user) throw new UnauthorizedException('Неверный логин или пароль');

    const existsPassword = await argon2.verify(user?.password, dto.password);

    if (!existsPassword) throw new UnauthorizedException('Неверный логин или пароль');

    const payload = { email: user.email, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ONE_MONTH,
    }); //Сделать рефреш токен

    res.cookie(
      'user',
      { id: user.id, name: user.name, surname: user.surname, email: user.email, role: user.role },
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ONE_MONTH,
      }
    );

    return { message: 'Успещная авторизация' };
  }

  public logout(res: Response, req: Request) {
    if (req.cookies.access_token) {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      res.clearCookie('user', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return { message: 'Успешный выход' };
    } else {
      throw new UnauthorizedException('Вы не авторизованы');
    }
  }
}
