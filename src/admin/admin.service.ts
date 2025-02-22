import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUser() {
    const user = await this.prismaService.user.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });

    return user;
  }
}
