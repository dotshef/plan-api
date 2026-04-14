import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ maxLength: 200, example: 'Hello world' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'This is the body of the post.' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
