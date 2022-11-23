/* istanbul ignore file */
import { IsIn, IsString } from "class-validator";

export class AddPayDto {
  
  @IsIn(['gratis','intermedio','premium'])
  @IsString()
  payTitle: string;
}