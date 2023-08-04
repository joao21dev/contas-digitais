import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';
import { CreateCustomerDto } from '@domain/dtos/customers/create-customer.dto';
import { UpdateCustomerDto } from '@domain/dtos/customers/update-customer.dto';
import { Customer } from '@domain/entities/customer.entity';

export abstract class CustomersRepository {
  abstract findAll(): Promise<Customer[]> | HttpErrorResponse;
  abstract create(
    data: CreateCustomerDto,
  ): Promise<Customer> | HttpErrorResponse;
  abstract update(data: {
    data: UpdateCustomerDto;
    customer_id: number;
  }): Promise<Customer> | HttpErrorResponse;
  abstract findByCustomerId(data: {
    customer_id: number;
  }): Promise<Customer> | HttpErrorResponse;
}
