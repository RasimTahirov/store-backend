import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, PaginationService, S3Service],
})
export class AdminModule {}
