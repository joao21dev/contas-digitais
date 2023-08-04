import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { Account } from '@domain/entities/account.entity';
import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';

@Injectable()
export class PostgresTransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  private generateRandomAccountNumber(): number {
    return Math.floor(1000000 + Math.random() * 9000000);
  }

  async create(
    data: CreateTransactionDto,
  ): Promise<HttpErrorResponse | Transaction> {
    try {
      const { account_id, transaction_type, amount } = data;

      const destinationAccount = await this.accountRepository.findOne({
        where: { account_id: account_id },
        relations: ['customer'],
      });

      if (!destinationAccount) {
        return makeError({
          message: 'Conta de destino não encontrada',
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
          return makeError({
            message: 'Saldo insuficiente para saques.',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            layer: ErrorLayerKind.REPOSITORY_ERROR,
          });
        }
        destinationAccount.balance -= data.amount;
      } else if (data.transaction_type === 'deposit') {
        destinationAccount.balance += data.amount;
      } else {
        return makeError({
          message:
            "Insiira uma transação válida: 'withdraw' para saque ou 'deposit' para depósitos",
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      await this.transactionRepository.save(newTransaction);
      await this.accountRepository.save(destinationAccount);

      return newTransaction;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findById(data: {
    id: number;
  }): Promise<HttpErrorResponse | Transaction> {
    try {
      const { id } = data;
      const transaction = await this.transactionRepository.findOne({
        where: { transaction_id: id },
      });

      if (!transaction) {
        return makeError({
          message: 'Transação não encontrada',
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

      if (!transactions) {
        return makeError({
          message: 'Nenhuma transação encontrada',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      const customer = await this.accountRepository.findOne({
        where: { account_id },
        relations: ['customer'],
      });

      return { transactions, customer };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }
}
