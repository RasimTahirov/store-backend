import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paginationService: PaginationService
  ) {}

  @Get('products/man')
  getLastManProduct() {
    return this.userService.getLastManProduct();
  }

  @Get('products/woman')
  getLastWomanProduct() {
    return this.userService.getLastWomanProduct();
  }

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
  async getCategoryById(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
    const page = Number(paginationDto.page);
    const limit = Number(paginationDto.limit);

    const data = await this.userService.getCategoryById(id);
    const totalCount = data.products.length;

    return this.paginationService.paginate(data.products, totalCount, page, limit);
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

  @Get('search')
  async search(@Query('title') title: string) {
    return this.userService.searchProductsByTitle(title);
  }
}
