import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { RoleDecorator } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/types/type';

@Controller('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
@RoleDecorator(Role.ADMIN)
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
}
