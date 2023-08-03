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

  async create(data: CreateTransactionDto): Promise<any> {
    try {
      const { account_number, type, amount } = data;

      const destinationAccount = await this.accountRepository.findOne({
        where: { account_number },
      });

      if (!destinationAccount) {
        return {
          error: {
            message: 'Destination account not found',
            status: HttpStatus.BAD_REQUEST,
            layer: 'SERVICE_ERROR',
          },
        };
      }

      if (data.type === 'withdraw') {
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
      } else if (data.type === 'deposit') {
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

      const order = await this.transactionRepository.save({
        account_number,
        type,
        amount,
      });

      await this.accountRepository.save(destinationAccount);

      return {
        order,
        destinationAccount,
      };
    } catch (error) {
      return {
        error: {
          message: 'Error creating data',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          layer: 'SERVICE_ERROR',
        },
      };
    }
  }

  async findById(data: { id: string }): Promise<any> {
    try {
      const { id } = data;
      const transaction = await this.transactionRepository.findOne({
        where: { id },
      });

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

  async findByAccountNumber(data: { account_number: number }): Promise<any> {
    try {
      const { account_number } = data;
      // const transactions = await this.transactionRepository.find({
      //   relations: ['account'],
      //   where: { account: { account_number } },
      // });

      return 'teste';
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }
}
