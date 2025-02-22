import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
// @RoleDecorator(Role.ADMIN)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly paginationService: PaginationService
  ) {}

  @Post('users')
  async getAllUser(@Query() paginationDto: PaginationDto) {
    const data = await this.adminService.getAllUser();
    const totalCount = data.length;
    return this.paginationService.paginate(
      data,
      totalCount,
      paginationDto.page,
      paginationDto.limit
    );
  }

  @Get('create/category')
  async createCategory(@Body() body: { name: string }) {
    return this.adminService.createCategory(body.name);
  }
}
