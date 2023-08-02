import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindByIdTransactionService } from 'src/app/transaction/use-cases/find-by-id-transaction/find-by-id-transaction.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('transacoes')
@Controller('transacoes')
export class FindByIdTransactionController {
  constructor(
    private readonly findByIdTransactionService: FindByIdTransactionService,
  ) {}

  @Get('id')
  @ApiOperation({ summary: 'Buscar uma transação por id' })
  @ApiCreatedResponse({ description: 'Transação encontrada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Param('id') id: string) {
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
