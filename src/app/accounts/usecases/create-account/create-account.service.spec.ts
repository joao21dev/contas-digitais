import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { CreateAccountService } from './create-account.service';
import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { PostgresAccountsRepository } from '@infra/database/postgres/accounts.repository';
import createdAccountMock from '@common/mocks/created-account.mock';

describe('CreateAccountService', () => {
  let sut: CreateAccountService;
  let accountsRepository: AccountsRepository;
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
        CreateAccountService,
        {
          provide: AccountsRepository,
          useClass: PostgresAccountsRepository,
        },
      ],
    }).compile();

    sut = module.get<CreateAccountService>(CreateAccountService);
    accountsRepository = module.get<AccountsRepository>(AccountsRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to create a account', async () => {
    jest
      .spyOn(accountsRepository, 'create')
      .mockResolvedValue(createdAccountMock as any);

    const result = await sut.execute(createdAccountMock as any);

    const expected = { customer: createdAccountMock }; //starts with customer to show customer first in the list
    //but account is is inside customer object

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(accountsRepository, 'create')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(createdAccountMock as any);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
