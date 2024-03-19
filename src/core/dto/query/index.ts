import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ExtraQueryDto {
  @IsOptional()
  @IsString()
  public perpage: string;

  @IsOptional()
  @IsString()
  public page: string;

  @IsOptional()
  @IsString()
  public sort: string;

  @IsOptional()
  @IsString()
  public q: string;

  @IsOptional()
  @IsString()
  public to: string;

  @IsOptional()
  @IsString()
  public from: string;
}

export class FindByIdDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public id: number;
}

export class FindByPostIdDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public postId: number;
}
