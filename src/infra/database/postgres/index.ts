import { PostgresAccountsRepository } from './accounts.repository';
import { PostgresCustomersRepository } from './customer.repository';
import { PostgresTransactionsRepository } from './transactions.repository';

export default [
  PostgresAccountsRepository,
  PostgresCustomersRepository,
  PostgresTransactionsRepository,
];
