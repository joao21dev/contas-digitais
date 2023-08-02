import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';
import { AccountsRepository } from '../../repositories/account.repository';

@Injectable()
export class UpdateAccountService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(data: UpdateAccountDto, id: string) {
    try {
      const account = await this.accountsRepository.update({
        data,
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
