import { FindByAccountIdAccountController } from '../accounts/find-by-account-id-account/find-by-account-id-account.controller';
import { CreateTransactionController } from './create-transaction/create-transaction.controller';
import { FindByAccountIdTransactionsController } from './find-by-account-id-transaction/find-by-account-id-transaction.controller';
import { FindByIdTransactionController } from './find-by-id-transaction/find-by-id-transaction.controller';

export default [
  CreateTransactionController,
  FindByAccountIdAccountController,
  FindByAccountIdTransactionsController,
  FindByIdTransactionController,
];
