/* istanbul ignore file */
import {
  IsString,
  IsInt,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class SportUserDto {
  @IsInt()
  edad: number;

  @IsInt()
  peso: number;

  @IsInt()
  imc: number;
}
