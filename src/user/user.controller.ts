import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('data')
  @UseGuards(JwtAuthGuard)
  getUserData(@Req() req: Request) {
    return this.userService.getUserData(req);
  }

  @Get('categories')
  getAllCategory() {
    return this.userService.getAllCategory();
  }

  @Get('categories/man')
  getManCategories() {
    return this.userService.getManCategories();
  }

  @Get('categories/woman')
  getWomanCategories() {
    return this.userService.getWomanCategories();
  }

  @Get('category/:id')
  getCategoryById(@Param('id') id: string) {
    return this.userService.getCategoryById(id);
  }

  @Get('product/:id')
  getProductById(@Param('id') id: string) {
    return this.userService.getProductById(id);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  checkAuthStatus() {
    return this.userService.checkAuthStatus();
  }
}
