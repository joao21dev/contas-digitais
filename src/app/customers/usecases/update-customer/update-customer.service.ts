import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { UpdateCustomerDto } from '@domain/dtos/customers/update-customer.dto';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class UpdateCustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(data: UpdateCustomerDto, customer_id: number) {
    try {
      const customer = await this.customersRepository.update({
        data,
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
