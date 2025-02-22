import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/type';

export const RoleDecorator = (role: Role) => {
  return SetMetadata('role', role);
};
