import { Size } from '../types/type';

export class CreateProductDto {
  title: string;
  description: string;
  price: string;
  size: Size;
  color: string;
  category: string;
}
