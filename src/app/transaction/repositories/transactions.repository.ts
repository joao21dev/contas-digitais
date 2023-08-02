import { HttpErrorResponse } from 'src/common/interfaces/http-error-response.interface';
import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(
    data: CreateTransactionDto,
  ): Promise<Transaction> | HttpErrorResponse;
  abstract findById(data: {
    id: string;
  }): Promise<Transaction> | HttpErrorResponse;
  abstract findByAccountNumber(data: {
    account_number: number;
  }): Promise<Transaction[]> | HttpErrorResponse;
}
