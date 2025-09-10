import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
