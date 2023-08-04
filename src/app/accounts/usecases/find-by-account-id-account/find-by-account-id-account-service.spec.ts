import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { FindByAccountIdAccountService } from './find-by-account-id-account.service';
import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { PostgresAccountsRepository } from '@infra/database/postgres/accounts.repository';
import createdAccountMock from '@common/mocks/created-account.mock';

describe('FindByAccountIdAccountService', () => {
  let sut: FindByAccountIdAccountService;
  let accountsRepository: AccountsRepository;
  let module: TestingModule;
  const account_id_mock = 1;

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
        FindByAccountIdAccountService,
        {
          provide: AccountsRepository,
          useClass: PostgresAccountsRepository,
        },
      ],
    }).compile();

    sut = module.get<FindByAccountIdAccountService>(
      FindByAccountIdAccountService,
    );
    accountsRepository = module.get<AccountsRepository>(AccountsRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to find account by account_id', async () => {
    jest
      .spyOn(accountsRepository, 'findByAccountId')
      .mockResolvedValue(createdAccountMock as any);

    const result = await sut.execute(account_id_mock);

    const expected = { account: createdAccountMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(accountsRepository, 'findByAccountId')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(account_id_mock);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
