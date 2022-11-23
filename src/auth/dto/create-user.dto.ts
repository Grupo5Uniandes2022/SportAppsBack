/* istanbul ignore file */
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;
  
  @IsString()
  @IsOptional()
  @MinLength(1)
  fullName: string;
}