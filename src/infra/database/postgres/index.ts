import { PostgresAccountsRepository } from './accounts.repository';
import { PostgresCustomersRepository } from './customers.repository';
import { PostgresTransactionsRepository } from './transactions.repository';

export default [
  PostgresAccountsRepository,
  PostgresCustomersRepository,
  PostgresTransactionsRepository,
];
