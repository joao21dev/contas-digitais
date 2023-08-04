import { CreateAccountDto } from '@domain/dtos/account/create-account.dto';
import { HttpErrorResponse } from 'src/common/interfaces/http-error-response.interface';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';
import { Account } from 'src/domain/entities/account.entity';

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
