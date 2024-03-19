import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExtraQueryDto } from '../query';

export class AddCommentDto {
  @IsNotEmpty()
  @IsString()
  public readonly comment: string;
}

export class GetCommentQueryDto extends ExtraQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public user: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public post: number;
}
