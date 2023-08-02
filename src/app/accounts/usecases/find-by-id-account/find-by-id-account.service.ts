import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { AccountsRepository } from '../../repositories/account.repository';

@Injectable()
export class FindByIdAccountService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(id: string) {
    try {
      const account = await this.accountsRepository.findById({
        id,
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
