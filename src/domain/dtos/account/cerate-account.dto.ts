import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  account_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountType: string;
}
