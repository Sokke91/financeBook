import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  acountName: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
