import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';
import { CreateAccountDto } from '@domain/dtos/account/create-account.dto';
import { UpdateAccountDto } from '@domain/dtos/account/update-account.dto';
import { Account } from '@domain/entities/account.entity';
import { Customer } from '@domain/entities/customer.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return Math.floor(10000 + Math.random() * 90000);
  }

  async create(data: CreateAccountDto): Promise<HttpErrorResponse | Account> {
    try {
      const { customer_id } = data;

      const customer = await this.customerRepository.findOne({
        where: { customer_id: customer_id },
      });

      if (!customer) {
        return makeError({
          message: 'Cliente não encontrado',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      const account_id = this.generateRandomAccountNumber();

      const newAccount = new Account();

      newAccount.account_id = account_id;
      newAccount.customer_id = customer_id;
      newAccount.balance = 0;
      newAccount.customer = customer;

      this.accountRepository.save(newAccount);

      return newAccount;
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
    account_id: number;
  }): Promise<HttpErrorResponse | Account> {
    try {
      const { account_id, data: updateData } = data;

      const accountToUpdate = await this.accountRepository.findOne({
        where: { account_id },
      });

      if (!accountToUpdate) {
        return makeError({
          message: 'Conta não encontrada',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      const allowedAttributes = ['account_id'];
      const invalidAttributes = Object.keys(updateData).filter(
        (attribute) => !allowedAttributes.includes(attribute),
      );

      if (invalidAttributes.length > 0) {
        return makeError({
          message: `Somente o account_id pode ser alterado. Atributos invalidos: ${invalidAttributes.join(
            ', ',
          )}`,
          status: HttpStatus.BAD_REQUEST,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      accountToUpdate.account_id = updateData.account_id; // Atualização do account_id aqui

      await this.accountRepository.save(accountToUpdate);
      return accountToUpdate;
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
      const account = await this.accountRepository.findOne({
        where: { account_id },
        relations: ['customer'], // Carrega também o relacionamento com o customer
      });

      if (!account) {
        return makeError({
          message: 'Conta não encontrada',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      return {
        account: {
          account_id: account.account_id,
          customer_id: account.customer_id,
          balance: account.balance,
          customer: account.customer,
        },
      };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findByCustomerId(data: { customer_id: number }): Promise<any> {
    try {
      const { customer_id } = data;
      const accounts = await this.accountRepository.find({
        where: { customer_id },
      });

      const customer_info = await this.customerRepository.findOne({
        where: { customer_id },
        select: ['name', 'document'],
      });

      if (!accounts) {
        return makeError({
          message: 'Nenhuma conta encontrada',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      return {
        customer_info,
        accounts,
      };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }
}
