import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  account_id: number;
}
