import { CreateAccountService } from './create-account/create-account.service';
import { FindByCustomerIdAccountsService } from './find-by-customer-id-accounts/find-by-customer-id-accounts.service';
import { FindByAccountIdAccountService } from './find-by-account-id-account/find-by-account-id-account.service';
import { UpdateAccountService } from './update-account/update-account.service';

export default [
  CreateAccountService,
  FindByCustomerIdAccountsService,
  FindByAccountIdAccountService,
  UpdateAccountService,
];
