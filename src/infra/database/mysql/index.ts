import { MySqlAccountsRepository } from './accounts.repository';
import { MySqlCustomersRepository } from './customer.repository';
import { MySqlTransactionsRepository } from './transactions.repository';

export default [
  MySqlAccountsRepository,
  MySqlCustomersRepository,
  MySqlTransactionsRepository,
];
