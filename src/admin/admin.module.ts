import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, PaginationService],
})
export class AdminModule {}
