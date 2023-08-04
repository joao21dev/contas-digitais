import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';
import { CreateAccountDto } from '@domain/dtos/account/create-account.dto';
import { UpdateAccountDto } from '@domain/dtos/account/update-account.dto';
import { Account } from '@domain/entities/account.entity';

export abstract class AccountsRepository {
  abstract create(data: CreateAccountDto): Promise<Account> | HttpErrorResponse;
  abstract update(data: {
    data: UpdateAccountDto;
    account_id: number;
  }): Promise<Account> | HttpErrorResponse;
  abstract findByAccountId(data: {
    account_id: number;
  }): Promise<Account> | HttpErrorResponse;
  abstract findByCustomerId(data: {
    customer_id: number;
  }): Promise<Account[]> | HttpErrorResponse;
}
