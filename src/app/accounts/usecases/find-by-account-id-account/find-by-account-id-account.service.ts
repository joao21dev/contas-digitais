import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class FindByAccountIdAccountService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(account_id: number) {
    try {
      const account = await this.accountsRepository.findByAccountId({
        account_id,
      });

      return { account };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.SERVICE_ERROR,
      });
    }
  }
}
