import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Role } from 'src/auth/types/type';
import { RoleDecorator } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly paginationService: PaginationService
  ) {}

  @Post('users')
  @RoleDecorator(Role.ADMIN)
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

  @Put('user/update/:id')
  @RoleDecorator(Role.ADMIN)
  async upadtedRole(@Param('id') id: string, @Body() body: { role: Role }) {
    return this.adminService.upadtedRole(id, body.role);
  }

  @Get('create/category')
  @RoleDecorator(Role.ADMIN)
  async createCategory(@Body() body: { name: string }) {
    return this.adminService.createCategory(body.name);
  }
}
