import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  account_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transaction_type: 'deposit' | 'withdraw';

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
