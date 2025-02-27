import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('data')
  getUserData(@Req() req: Request) {
    return this.userService.getUserData(req);
  }

  @Get('categories')
  getAllCategory() {
    return this.userService.getAllCategory();
  }
}
