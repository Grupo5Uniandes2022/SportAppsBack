/* istanbul ignore file */
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  plan: string;
}
