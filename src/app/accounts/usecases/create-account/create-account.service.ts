import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { CreateAccountDto } from 'src/domain/dtos/account/cerate-account.dto';
import { AccountsRepository } from '../../repositories/account.repository';

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
