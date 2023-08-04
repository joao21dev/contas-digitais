import { ApiProperty } from '@nestjs/swagger';

export class CustomerNotFoundDoc {
  @ApiProperty({
    example: 'Cliente não encontrado',
  })
  message: string;

  @ApiProperty({
    example: 'REPOSITORY_ERROR',
  })
  layer: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'If the error persists, send this information to support',
  })
  support: string;
}
