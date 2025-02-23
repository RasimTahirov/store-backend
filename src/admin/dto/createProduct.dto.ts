import { Size } from '../types/type';

export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  size: Size;
  color: string;
  category: string;
}
