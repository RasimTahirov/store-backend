import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../types/type';
import { User } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Role>('role', context.getHandler());

    if (!role) {
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    const checkRole = () => role === user.role;

    return checkRole();
  }
}
