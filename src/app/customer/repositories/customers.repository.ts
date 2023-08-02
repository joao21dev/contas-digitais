import { HttpErrorResponse } from 'src/common/interfaces/http-error-response.interface';
import { CreateCustomerDto } from 'src/domain/dtos/customers/create-customer.dto';
import { UpdateCustomerDto } from 'src/domain/dtos/customers/update-customer.dto';
import { Customer } from 'src/domain/entities/customer.entity';

export abstract class CustomersRepository {
  abstract create(
    data: CreateCustomerDto,
  ): Promise<Customer> | HttpErrorResponse;
  abstract update(data: {
    data: UpdateCustomerDto;
    id: string;
  }): Promise<Customer> | HttpErrorResponse;
  abstract findById(data: {
    id: string;
  }): Promise<Customer> | HttpErrorResponse;
}
