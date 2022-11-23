/* istanbul ignore file */
import { IsArray, IsIn, IsOptional, IsString } from "class-validator";

export class CreateUserLimitationDto {

  @IsIn(['vegetariano','vegano','curdivegano','animal'])
  alimentationType: string;
  
  @IsString({each: true})
  @IsArray()
  @IsOptional()
  alergies: string[];
  
  @IsString({each: true})
  @IsArray()
  @IsOptional()
  foodIntolerances: string[];

}
