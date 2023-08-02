import { Module } from '@nestjs/common';
import controllers from './controllers';
import { CustomerModule } from 'src/app/customers/customer.module';
import { AccountModule } from 'src/app/accounts/account.module';
import { TransactionModule } from '@app/transaction/transactions.module';

@Module({
  imports: [AccountModule, CustomerModule, TransactionModule],
  controllers: [...controllers],
})
export class PresentationModule {}
