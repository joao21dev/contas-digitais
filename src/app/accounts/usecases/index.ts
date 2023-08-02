import { CreateAccountService } from './create-account/create-account.service';
import { FindByAccountNumberAccountService } from './find-by-account-number-account/find-by-account-number-account.service';
import { FindByCustomerIdAccountService } from './find-by-customer-id-accounts/find-by-customer-id-accounts.service';
import { FindByIdAccountService } from './find-by-id-account/find-by-id-account.service';
import { UpdateAccountService } from './update-account/update-account.service';

export default [
  CreateAccountService,
  FindByAccountNumberAccountService,
  FindByCustomerIdAccountService,
  FindByIdAccountService,
  UpdateAccountService,
];
