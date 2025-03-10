// pagination.dto.ts
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // Преобразует строку в число, гарантируя тип number
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // То же для limit
  limit: number;
}
