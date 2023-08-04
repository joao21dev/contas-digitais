import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';
import { CreateTransactionDto } from '@domain/dtos/transactions/create-transaction.dto';
import { Transaction } from '@domain/entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(
    data: CreateTransactionDto,
  ): Promise<Transaction> | HttpErrorResponse;
  abstract findById(data: {
    id: number;
  }): Promise<Transaction> | HttpErrorResponse;
  abstract findByAccountId(data: {
    account_id: number;
  }): Promise<Transaction[]> | HttpErrorResponse;
}
