import { FindByAccountIdTansactionsService } from '@app/transaction/usecases/find-by-account-id-transactions/find-by-account-id-transactions.service';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { TransactionSuccessDoc } from '@common/docs/transactions/transaction-success.doc';
import { TransactionsNotFoundDoc } from '@common/docs/transactions/transactions-not-found.doc';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';

@ApiTags('transacoes')
@Controller('transacoes')
export class FindByAccountIdTransactionsController {
  constructor(
    private readonly findByAccountIdTansactionsService: FindByAccountIdTansactionsService,
  ) {}

  @Get('account-id/:account_id')
  @ApiOperation({
    summary: 'Buscar transações de uma conta pelo account_id',
    description:
      'Econtra todas as transações da conta cujo account_id foi passado como parâmetro.',
  })
  @ApiQuery({
    name: 'account_id',
    type: String,
    required: true,
    description: 'Id da conta que deseja encontrar as transações.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Transações encontradas com sucesso',
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
  async execute(@Param('account_id') account_id: number) {
    try {
      const result = await this.findByAccountIdTansactionsService.execute(
        account_id,
      );

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
