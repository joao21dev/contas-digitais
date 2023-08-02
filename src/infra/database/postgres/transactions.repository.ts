import { CreateTransactionDto } from 'src/domain/dtos/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';

@Injectable()
export class PostgresTransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: CreateTransactionDto): Promise<any> {
    try {
      const newTransaction = this.transactionRepository.create(data);
      return this.transactionRepository.save(newTransaction);
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
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
      const transactions = await this.transactionRepository.find({
        relations: ['account'],
        where: { account: { account_number } },
      });

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
