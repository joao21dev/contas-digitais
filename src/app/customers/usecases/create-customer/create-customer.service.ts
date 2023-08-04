import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { CreateCustomerDto } from '@domain/dtos/customers/create-customer.dto';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(data: CreateCustomerDto) {
    try {
      const customer = await this.customersRepository.create(data);

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
