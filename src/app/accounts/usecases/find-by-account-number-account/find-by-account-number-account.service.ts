import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { AccountsRepository } from '../../repositories/account.repository';

@Injectable()
export class FindByAccountNumberAccountService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(account_number: string) {
    try {
      const account = await this.accountsRepository.findByAccountNumber({
        account_number,
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
