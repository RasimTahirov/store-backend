import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({
    description: 'Данные пользователя',
    schema: {
      properties: {
        name: { type: 'string', example: 'Имя' },
        surname: { type: 'string', example: 'Фамилия' },
        email: { type: 'string', example: 'test@test.com' },
        password: { type: 'string', example: '123456', minLength: 6 },
        passwordRepeat: { type: 'string', example: '123456', minLength: 6 },
      },
      required: ['name', 'surname', 'email', 'password', 'passwordRepeat'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      example: {
        id: 'id',
        name: 'Имя',
        surname: 'Фамилия',
        email: 'test@test.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Ошибка регистрации при занятом email',
    schema: {
      example: { message: 'Пользователь с данным email уже существует' },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка регистрации при неправильном введеном пароле',
    schema: {
      example: { message: 'Пароли не совпадают' },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({
    description: 'Данные пользователя',
    schema: {
      properties: {
        email: { type: 'string', example: 'test@test.com' },
        password: { type: 'string', example: '123456', minLength: 6 },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Успешная авторизация',
    schema: {
      example: { message: 'Успешная авторизация' },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Не успешная авторизация при неверном логине или пароле',
    schema: {
      example: { message: 'Неверный логин или пароль' },
    },
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto, res);
    return res.json(result);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiResponse({
    status: 200,
    description: 'Выход из аккаунта',
    schema: {
      example: { message: 'Успешный выход' },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
    schema: {
      example: { message: 'Вы не авторизованы' },
    },
  })
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response, @Req() req: Request) {
    const result = this.authService.logout(res, req);
    return res.json(result);
  }
}
