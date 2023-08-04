import { HttpStatus, Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transactions.repository';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@Injectable()
export class FindByAccountIdTansactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(account_id: number) {
    try {
      const transactions = await this.transactionRepository.findByAccountId({
        account_id,
      });

      return { transactions };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.SERVICE_ERROR,
      });
    }
  }
}
