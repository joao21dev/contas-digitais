import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class FindByCustomerIdAccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(customer_id: number) {
    try {
      const accounts = await this.accountsRepository.findByCustomerId({
        customer_id,
      });
      return { accounts };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.SERVICE_ERROR,
      });
    }
  }
}
