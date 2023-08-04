import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionService } from '@app/transaction/usecases/create-transaction/create-transaction.service';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { CreateTransactionDto } from '@domain/dtos/transactions/create-transaction.dto';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { TransactionSuccessDoc } from '@common/docs/transactions/transaction-success.doc';

@ApiTags('transacoes')
@Controller('transacoes')
export class CreateTransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma transação de saque ou depósito',
    description:
      'Cria uma transação passando o account_id da conta de destino, o valor e o tipo de transação (deposit para depositar ou withdraw para sacar um valor da conta)',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transação criada com sucesso',
    type: TransactionSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
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
