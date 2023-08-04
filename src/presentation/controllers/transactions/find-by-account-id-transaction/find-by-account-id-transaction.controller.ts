import { FindByAccountIdTansactionsService } from '@app/transaction/usecases/find-by-account-id-transactions/find-by-account-id-transactions.service';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('transacoes')
@Controller('transacoes')
export class FindByAccountIdTransactionsController {
  constructor(
    private readonly findByAccountIdTansactionsService: FindByAccountIdTansactionsService,
  ) {}

  @Get('account-id/:account_id')
  @ApiOperation({ summary: 'Buscar transações pelo account_id' })
  @ApiOkResponse({ description: 'Transações encontradas com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
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
