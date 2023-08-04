import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  account_id: number;

  @ApiProperty({ example: 'deposit' })
  @IsNotEmpty()
  transaction_type: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
