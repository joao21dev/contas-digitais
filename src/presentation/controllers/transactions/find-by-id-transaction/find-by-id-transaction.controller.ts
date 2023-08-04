import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindByIdTransactionService } from '@app/transaction/usecases/find-by-id-transaction/find-by-id-transaction.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { TransactionSuccessDoc } from '@common/docs/transactions/transaction-success.doc';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { TransactionsNotFoundDoc } from '@common/docs/transactions/transactions-not-found.doc';

@ApiTags('transacoes')
@Controller('transacoes')
export class FindByIdTransactionController {
  constructor(
    private readonly findByIdTransactionService: FindByIdTransactionService,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma transação pelo seu id',
    description: 'Econtra uma transação pelo seu id.',
  })
  @ApiQuery({
    name: 'transaction_id',
    type: String,
    required: true,
    description: 'Id da transação que deseja encontrar.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Transação encontrada com sucesso',
    type: TransactionSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhuma transação encontrada',
    type: TransactionsNotFoundDoc,
  })
  async execute(@Param(':id') id: number) {
    try {
      const result = await this.findByIdTransactionService.execute(id);

      return result;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.CONTROLLER_ERROR,
      });
    }
  }
}
