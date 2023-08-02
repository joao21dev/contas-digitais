import { HttpStatus, Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transactions.repository';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@Injectable()
export class FindByAccountNumberTansactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(account_number: number) {
    try {
      const transactions = await this.transactionRepository.findByAccountNumber(
        {
          account_number,
        },
      );

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
