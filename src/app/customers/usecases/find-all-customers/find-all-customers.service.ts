import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute() {
    try {
      const customers = await this.customersRepository.findAll();

      return { customers };
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.SERVICE_ERROR,
      });
    }
  }
}
