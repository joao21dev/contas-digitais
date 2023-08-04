import { HttpErrorResponse } from 'src/common/interfaces/http-error-response.interface';
import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entities/transaction.entity';

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
