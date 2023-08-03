import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';
import { CreateAccountDto } from '@domain/dtos/account/cerate-account.dto';
import { UpdateAccountDto } from '@domain/dtos/account/update-account.dto';
import { Account } from '@domain/entities/account.entity';
import { Customer } from '@domain/entities/customer.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import accounts from '@presentation/controllers/accounts';
import { async } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresAccountsRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  private generateRandomAccountNumber(): number {
    return Math.floor(10000 + Math.random() * 90000); // Random 5-digit number
  }

  async create(data: CreateAccountDto): Promise<HttpErrorResponse | Account> {
    try {
      // Find the customer with the provided customer_id
      const customer = await this.customerRepository.findOne({
        where: { id: data.customer_id },
      });
      if (!customer) {
        return makeError({
          message: 'Customer not found',
          status: HttpStatus.BAD_REQUEST,
          layer: ErrorLayerKind.SERVICE_ERROR,
        });
      }

      // Generate a random 5-digit account number
      const accountNumber = this.generateRandomAccountNumber();

      // Create the new account object
      const newAccount = new Account();
      newAccount.account_number = accountNumber;
      newAccount.customer_info = customer;
      newAccount.balance = 0;

      // Save the new account to the database
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
        where: { customer_info: { id: customer_id } },
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
