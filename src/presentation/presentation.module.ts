import { Module } from '@nestjs/common';
import controllers from './controllers';
import { CustomerModule } from 'src/app/customers/customer.module';
import { AccountModule } from 'src/app/accounts/account.module';

@Module({
  imports: [AccountModule, CustomerModule],
  controllers: [...controllers],
})
export class PresentationModule {}
