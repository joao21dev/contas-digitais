import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { CreateTransactionDto } from '@domain/dtos/transactions/create-transaction.dto';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class CreateTransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(data: CreateTransactionDto) {
    try {
      const transaction = await this.transactionRepository.create(data);

      return { transaction };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.SERVICE_ERROR,
      });
    }
  }
}
