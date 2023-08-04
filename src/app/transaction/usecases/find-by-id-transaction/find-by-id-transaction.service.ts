import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { Injectable, HttpStatus } from '@nestjs/common';

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
