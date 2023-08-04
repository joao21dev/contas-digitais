import { ApiProperty } from '@nestjs/swagger';
import { CustomerSuccessDoc } from '../customers/customer-success.doc';
import { IsNumber } from 'class-validator';

export class AccountSuccessDoc {
  @ApiProperty({ example: '24343' })
  @IsNumber()
  account_id: number;

  @ApiProperty({ example: '2' })
  @IsNumber()
  customer_id: number;

  @ApiProperty({ example: '0' })
  @IsNumber()
  balance: number;

  @ApiProperty({ example: 'Joao' })
  @ApiProperty()
  customer: CustomerSuccessDoc;
}
