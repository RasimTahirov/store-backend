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
      },
    });

    return user;
  }

  public async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Неверный логин или пароль');

    const existsPassword = await argon2.verify(user?.password, password);

    if (!existsPassword) throw new UnauthorizedException('Неверный логин или пароль');

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }
}
