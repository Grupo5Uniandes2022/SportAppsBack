/* istanbul ignore file */
import { IsIn, IsString, MinLength } from "class-validator";

export class CreateServiceDto {
  
  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @MinLength(10)
  address: string;

  @IsIn(['Cita Medica', 'Otro'])
  type: string;
}
