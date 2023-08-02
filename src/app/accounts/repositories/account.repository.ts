import { HttpErrorResponse } from 'src/common/interfaces/http-error-response.interface';
import { CreateAccountDto } from 'src/domain/dtos/account/cerate-account.dto';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';
import { Account } from 'src/domain/entities/account.entity';

export abstract class AccountsRepository {
  abstract create(data: CreateAccountDto): Promise<Account> | HttpErrorResponse;
  abstract update(data: {
    data: UpdateAccountDto;
    id: string;
  }): Promise<Account> | HttpErrorResponse;
  abstract findById(data: { id: string }): Promise<Account> | HttpErrorResponse;
  abstract findByAccountNumber(data: {
    account_number: string;
  }): Promise<Account> | HttpErrorResponse;
  abstract findByCustomerId(data: {
    customer_id: string;
  }): Promise<Account[]> | HttpErrorResponse;
}
