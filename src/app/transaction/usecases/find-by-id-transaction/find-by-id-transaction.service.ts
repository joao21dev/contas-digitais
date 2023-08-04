import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionService } from '../create-transaction/create-transaction.service';
import { makeError } from 'src/common/functions/make-error';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { TransactionRepository } from '../../repositories/transactions.repository';

@Injectable()
export class FindByIdTransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: number) {
    try {
      const transaction = await this.transactionRepository.findById({
        id,
      });

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
