import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  title?: string;
}
