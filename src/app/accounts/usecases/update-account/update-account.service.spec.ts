import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { UpdateAccountService } from './update-account.service';
import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { PostgresAccountsRepository } from '@infra/database/postgres/accounts.repository';
import createdAccountMock from '@common/mocks/created-account.mock';

describe('UpdateAccountService', () => {
  let sut: UpdateAccountService;
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
        UpdateAccountService,
        {
          provide: AccountsRepository,
          useClass: PostgresAccountsRepository,
        },
      ],
    }).compile();

    sut = module.get<UpdateAccountService>(UpdateAccountService);
    accountsRepository = module.get<AccountsRepository>(AccountsRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to update a account', async () => {
    jest
      .spyOn(accountsRepository, 'update')
      .mockResolvedValue(createdAccountMock as any);

    const result = await sut.execute(createdAccountMock, account_id_mock);

    const expected = { account: createdAccountMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(accountsRepository, 'update')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(createdAccountMock, account_id_mock);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
