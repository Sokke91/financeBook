import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  details: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  costs: number;

  @IsString()
  @IsNotEmpty()
  intervall: string;

  @IsNumber()
  @IsNotEmpty()
  intervallValue: number;
}
