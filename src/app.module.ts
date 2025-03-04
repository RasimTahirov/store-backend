import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PaginationModule } from './pagination/pagination.module';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminModule,
    PaginationModule,
    S3Module,
    UserModule,
    CartModule,
  ],
})
export class AppModule {}
