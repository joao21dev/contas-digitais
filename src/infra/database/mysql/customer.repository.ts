import { CreateCustomerDto } from 'src/domain/dtos/customers/create-customer.dto';
import { UpdateCustomerDto } from 'src/domain/dtos/customers/update-customer.dto';
import { Customer } from 'src/domain/entities/customer.entity';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { HttpErrorResponse } from '@common/interfaces/http-error-response.interface';

@Injectable()
export class MySqlCustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(data: CreateCustomerDto): Promise<Customer | HttpErrorResponse> {
    try {
      const newCustomer = this.customerRepository.create(data);
      return this.customerRepository.save(newCustomer);
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async update(data: {
    data: UpdateCustomerDto;
    id: string;
  }): Promise<Customer | HttpErrorResponse> {
    try {
      const { id, data: updateData } = data;
      const customerToUpdate = await this.customerRepository.findOne({
        where: { id },
      });

      if (!customerToUpdate) {
        return makeError({
          message: 'Customer not found',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      this.customerRepository.merge(customerToUpdate, updateData);
      return this.customerRepository.save(customerToUpdate);
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }

  async findById(data: { id: string }): Promise<Customer | HttpErrorResponse> {
    try {
      const { id } = data;
      const customer = await this.customerRepository.findOne({
        where: { id },
      });

      if (!customer) {
        return makeError({
          message: 'Customer not found',
          status: HttpStatus.NOT_FOUND,
          layer: ErrorLayerKind.REPOSITORY_ERROR,
        });
      }

      return customer;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.REPOSITORY_ERROR,
      });
    }
  }
}
