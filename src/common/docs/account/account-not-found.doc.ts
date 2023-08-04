import { ApiProperty } from '@nestjs/swagger';

export class AccountNotFoundDoc {
  @ApiProperty({
    example: 'Conta não encontrado',
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
