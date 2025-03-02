import { Gender } from '@prisma/client';

export class createCategoryDto {
  name: string;
  url: string;
  gender: Gender;
}
