import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDoc {
  @ApiProperty({
    example: 'Unexpected token , in JSON at position 15',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Resquest',
  })
  error: string;

  @ApiProperty({
    example: 400,
  })
  statusCode: number;
}
