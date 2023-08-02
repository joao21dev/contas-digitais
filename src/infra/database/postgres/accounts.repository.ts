import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';
import { CreateAccountDto } from '@domain/dtos/account/cerate-account.dto';
import { UpdateAccountDto } from '@domain/dtos/account/update-account.dto';
import { Account } from '@domain/entities/account.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresAccountsRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(data: CreateAccountDto): Promise<HttpErrorResponse | Account> {
    try {
      const newAccount = this.accountRepository.create(data);
      return this.accountRepository.save(newAccount);
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async update(data: {
    data: UpdateAccountDto;
    id: string;
  }): Promise<HttpErrorResponse | Account> {
    try {
      const { id, data: updateData } = data;
      const accountToUpdate = await this.accountRepository.findOne({
        where: { id },
      });

      if (!accountToUpdate) {
        return makeError({
          message: 'Account not found',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      this.accountRepository.merge(accountToUpdate, updateData);
      return this.accountRepository.save(accountToUpdate);
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findById(data: { id: string }): Promise<HttpErrorResponse | Account> {
    try {
      const { id } = data;
      const account = await this.accountRepository.findOne({
        where: { id },
      });

      if (!account) {
        return makeError({
          message: 'Account not found',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      return account;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findByAccountNumber(data: {
    account_number: number;
  }): Promise<HttpErrorResponse | Account> {
    try {
      const { account_number } = data;
      const account = await this.accountRepository.findOne({
        where: { account_number },
      });

      if (!account) {
        return makeError({
          message: 'Account not found',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      return account;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findByCustomerId(data: {
    customer_id: string;
  }): Promise<HttpErrorResponse | Account[]> {
    try {
      const { customer_id } = data;
      const accounts = await this.accountRepository.find({
        relations: ['customer'],
        where: { customer: { id: customer_id } },
      });

      return accounts;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }
}
