import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { PostgresAccountsRepository } from '@infra/database/postgres/accounts.repository';
import { FindByCustomerIdAccountsService } from './find-by-customer-id-accounts.service';
import createdAccountsMock from '@common/mocks/created-accounts.mock';

describe('FindByCustomerIdAccountsService', () => {
  let sut: FindByCustomerIdAccountsService;
  let accountsRepository: AccountsRepository;
  let module: TestingModule;
  const customer_id_mock = 1;

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
        FindByCustomerIdAccountsService,
        {
          provide: AccountsRepository,
          useClass: PostgresAccountsRepository,
        },
      ],
    }).compile();

    sut = module.get<FindByCustomerIdAccountsService>(
      FindByCustomerIdAccountsService,
    );
    accountsRepository = module.get<AccountsRepository>(AccountsRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to find all customers accounts by account_id', async () => {
    jest
      .spyOn(accountsRepository, 'findByCustomerId')
      .mockResolvedValue(createdAccountsMock as any);

    const result = await sut.execute(customer_id_mock);

    const expected = { accounts: createdAccountsMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(accountsRepository, 'findByCustomerId')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(customer_id_mock);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
