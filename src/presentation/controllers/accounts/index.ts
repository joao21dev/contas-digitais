import { CreateAccountController } from './create-account/create-account.controller';
import { FindByAccountNumberAccountController } from './find-by-account-number-account/find-by-account-number-account.controller';
import { FindByCustomerIdAccountController } from './find-by-customer-id-accounts/find-by-customer-id-accounts.controller';
import { UpdateAccountController } from './update-account/update-account.controller';

export default [
  CreateAccountController,
  FindByAccountNumberAccountController,
  FindByCustomerIdAccountController,
  UpdateAccountController,
];
