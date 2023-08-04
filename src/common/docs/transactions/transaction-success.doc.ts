import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TransactionSuccessDoc {
  @ApiProperty({ example: '24343' })
  @IsNumber()
  transaction_id: number;

  @ApiProperty({ example: '99999' })
  @IsNumber()
  account_id: number;

  @ApiProperty({ example: '0' })
  @IsNumber()
  transaction_type: string;

  @ApiProperty({ example: '20' })
  @ApiProperty()
  amount: number;
}
