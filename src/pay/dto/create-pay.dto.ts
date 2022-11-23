/* istanbul ignore file */
import { IsArray, IsIn, IsString } from "class-validator";

export class CreatePayDto {

  @IsIn(['gratis','intermedio','premium'])
  @IsString()
  title: string;

  @IsArray()
  @IsString({each: true})
  features: string[]

}
