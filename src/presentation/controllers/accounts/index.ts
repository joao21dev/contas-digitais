import { CreateAccountController } from './create-account/create-account.controller';
import { FindByAccountIdAccountController } from './find-by-account-id-account/find-by-account-id-account.controller';
import { FindByCustomerIdAccountController } from './find-by-customer-id-accounts/find-by-customer-id-accounts.controller';
import { UpdateAccountController } from './update-account/update-account.controller';

export default [
  CreateAccountController,
  FindByAccountIdAccountController,
  FindByCustomerIdAccountController,
  UpdateAccountController,
];
