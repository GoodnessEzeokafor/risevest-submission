import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExtraQueryDto } from '../query';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public content: string;
}
export class GetPostsQueryDto extends ExtraQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public id: number;

  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public user: number;
}
