import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';
import { TransactionRepository } from '../../repositories/transactions.repository';

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
