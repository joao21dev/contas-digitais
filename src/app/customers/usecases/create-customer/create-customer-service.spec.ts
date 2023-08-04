import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerService } from './create-customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { PostgresCustomersRepository } from '@infra/database/postgres/customers.repository';
import createdCustomerMock from '@common/mocks/created-customer.mock';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';

describe('CreateCustomerService', () => {
  let sut: CreateCustomerService;
  let customersRepository: CustomersRepository;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return { ...databaseConfig() };
          },
        }),
        TypeOrmModule.forFeature([...entities]),
      ],
      providers: [
        CreateCustomerService,
        {
          provide: CustomersRepository,
          useClass: PostgresCustomersRepository,
        },
      ],
    }).compile();

    sut = module.get<CreateCustomerService>(CreateCustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to create a customer', async () => {
    jest
      .spyOn(customersRepository, 'create')
      .mockResolvedValue(createdCustomerMock as any);

    const result = await sut.execute(createdCustomerMock);

    const expected = { customer: createdCustomerMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(customersRepository, 'create')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(createdCustomerMock as any);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
