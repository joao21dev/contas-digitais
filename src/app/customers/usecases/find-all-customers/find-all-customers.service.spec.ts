import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { PostgresCustomersRepository } from '@infra/database/postgres/customers.repository';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { FindAllCustomersService } from './find-all-customers.service';
import findAllCustomersResponseMock from '@common/mocks/find-all-customers-response.mock';

describe('FindAllCustomersService', () => {
  let sut: FindAllCustomersService;
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
        FindAllCustomersService,
        {
          provide: CustomersRepository,
          useClass: PostgresCustomersRepository,
        },
      ],
    }).compile();

    sut = module.get<FindAllCustomersService>(FindAllCustomersService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to find all customers', async () => {
    jest
      .spyOn(customersRepository, 'findAll')
      .mockResolvedValue(findAllCustomersResponseMock as any);

    const result = await sut.execute();

    const expected = { customers: findAllCustomersResponseMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(customersRepository, 'findAll')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute();

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
