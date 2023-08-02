import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../repositories/customers.repository';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@Injectable()
export class FindByIdCustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(id: string) {
    try {
      const customer = await this.customersRepository.findById({
        id,
      });

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
