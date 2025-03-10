import { Gender, Size } from '../types/type';

export class CreateProductDto {
  title: string;
  description: string;
  price: string;
  size: Size;
  color: string;
  gender: Gender;
  category: string;
  compound: string;
  country: string;
  care: string;
}
