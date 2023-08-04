import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class FindByCustomerIdCustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(customer_id: number) {
    try {
      const customer = await this.customersRepository.findByCustomerId({
        customer_id,
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
