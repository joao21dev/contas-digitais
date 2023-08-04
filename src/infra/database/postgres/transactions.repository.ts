import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { Account } from '@domain/entities/account.entity';

@Injectable()
export class PostgresTransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  private generateRandomAccountNumber(): number {
    return Math.floor(1000000 + Math.random() * 9000000); // Random 5-digit number
  }

  async create(data: CreateTransactionDto): Promise<any> {
    try {
      const { account_id, transaction_type, amount } = data;

      const destinationAccount = await this.accountRepository.findOne({
        where: { account_id: account_id },
      });

      if (!destinationAccount) {
        return makeError({
          message: 'Destination account not found',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      const newTransaction = new Transaction();
      newTransaction.transaction_id = this.generateRandomAccountNumber();
      newTransaction.account_id = account_id;
      newTransaction.transaction_type = transaction_type;
      newTransaction.amount = amount;

      if (data.transaction_type === 'withdraw') {
        if (destinationAccount.balance < data.amount) {
          return {
            error: {
              message: 'Insufficient balance for withdrawal',
              status: HttpStatus.BAD_REQUEST,
              layer: 'SERVICE_ERROR',
            },
          };
        }
        destinationAccount.balance -= data.amount;
      } else if (data.transaction_type === 'deposit') {
        destinationAccount.balance += data.amount;
      } else {
        return {
          error: {
            message: 'Invalid transaction type',
            status: HttpStatus.BAD_REQUEST,
            layer: 'SERVICE_ERROR',
          },
        };
      }

      await this.transactionRepository.save(newTransaction);
      await this.accountRepository.save(destinationAccount);

      return {
        order: newTransaction,
        destinationAccount,
      };
    } catch (error) {
      return {
        error: {
          message: error.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        },
      };
    }
  }

  async findById(data: { id: number }): Promise<any> {
    try {
      const { id } = data;
      const transaction = await this.transactionRepository.findOne({});

      if (!transaction) {
        return makeError({
          message: 'Transaction not found',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      return transaction;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findByAccountId(data: { account_id: number }): Promise<any> {
    try {
      const { account_id } = data;
      const transactions = await this.transactionRepository.find({
        where: { account: { account_id } },
      });
      console.log(
        '🚀 ~ file: transactions.repository.ts:117 ~ PostgresTransactionsRepository ~ findByAccountId ~ transactions:',
        transactions,
      );

      return transactions;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }
}
