import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/domain/dtos/customers/create-customer.dto';
import { CustomersRepository } from '../../repositories/customers.repository';
import { makeError } from 'src/common/functions/make-error';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';

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
