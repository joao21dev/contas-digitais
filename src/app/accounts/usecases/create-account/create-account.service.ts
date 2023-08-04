import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { CreateAccountDto } from '@domain/dtos/account/create-account.dto';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class CreateAccountService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(data: CreateAccountDto) {
    try {
      const customer = await this.accountsRepository.create(data);

      return { customer };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.SERVICE_ERROR,
      });
    }
  }
}
