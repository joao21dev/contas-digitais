import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionService } from '@app/transaction/usecases/create-transaction/create-transaction.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';

@ApiTags('transacoes')
@Controller('transacoes')
export class CreateTransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma transação' })
  @ApiCreatedResponse({ description: 'Transação criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      const result = await this.createTransactionService.execute(
        createTransactionDto,
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
