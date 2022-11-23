/* istanbul ignore file */
import { IsDate, IsDateString, IsIn, IsString, IsInt, IsOptional } from "class-validator";

export class CreateEventDto {

  @IsDateString()
  startDate: Date;
  
  @IsDateString()
  @IsOptional()
  endDate: Date;
  
  @IsString()
  @IsOptional()
  title: string;

  @IsIn(['training','group','appointment','free'])
  @IsOptional()
  type: string;

  @IsInt()
  @IsOptional()
  duration: number = 0;

  @IsInt()
  @IsOptional()
  distance: number = 0;

}