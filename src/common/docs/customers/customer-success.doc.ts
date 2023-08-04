import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CustomerSuccessDoc {
  @ApiProperty({ example: 1 })
  @IsNumber()
  customer_id: number;

  @ApiProperty({ example: 'João dos Santos' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  document: string;

  @ApiProperty({ example: 'Eua das Flores, 123' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'joao@mail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: null })
  deleted_at: Date;

  @ApiProperty({ example: '2023-08-04t17:32:28.944Z' })
  created_at: Date;

  @ApiProperty({ example: '2023-08-04t17:32:28.944Z' })
  updated_at: Date;

  @ApiProperty({ example: 201 })
  @IsNumber()
  statusCode: number;
}
