import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../repositories/customers.repository';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { UpdateCustomerDto } from 'src/domain/dtos/customers/update-customer.dto';

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
