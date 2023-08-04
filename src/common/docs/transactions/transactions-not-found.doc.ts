import { ApiProperty } from '@nestjs/swagger';

export class TransactionsNotFoundDoc {
  @ApiProperty({
    example: 'Nenhuma transação encontrada',
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
