import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindByAccountNumberTansactionsService } from '@app/transaction/usecases/find-by-account-number-transactions/find-by-account-number-transactions.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@Controller('transacoes')
@ApiTags('transacoes')
export class FindByAccountNumberTransactionsController {
  constructor(
    private readonly findByAccountNumberTansactionsService: FindByAccountNumberTansactionsService,
  ) {}

  @Get('account-number')
  @ApiOperation({ summary: 'Buscar transações por número de conta' })
  @ApiOkResponse({ description: 'Transações encontradas com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Param('account_number') account_number: number) {
    try {
      const result = await this.findByAccountNumberTansactionsService.execute(
        account_number,
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
