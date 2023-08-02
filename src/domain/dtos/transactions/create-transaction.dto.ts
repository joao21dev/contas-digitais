import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  account_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
