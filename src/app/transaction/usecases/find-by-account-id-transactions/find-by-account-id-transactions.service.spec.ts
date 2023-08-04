import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import createdAccountsMock from '@common/mocks/created-accounts.mock';
import { FindByAccountIdTansactionsService } from './find-by-account-id-transactions.service';
import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import { PostgresTransactionsRepository } from '@infra/database/postgres/transactions.repository';
import createdTransactionMock from '@common/mocks/createdTransaction.mock';

describe('FindByAccountIdTransactionsService', () => {
  let sut: FindByAccountIdTansactionsService;
  let transactionRepository: TransactionRepository;
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
        FindByAccountIdTansactionsService,
        {
          provide: TransactionRepository,
          useClass: PostgresTransactionsRepository,
        },
      ],
    }).compile();

    sut = module.get<FindByAccountIdTansactionsService>(
      FindByAccountIdTansactionsService,
    );
    transactionRepository = module.get<TransactionRepository>(
      TransactionRepository,
    );
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to find all customers accounts by account_id', async () => {
    jest
      .spyOn(transactionRepository, 'findByAccountId')
      .mockResolvedValue(createdTransactionMock as any);

    const result = await sut.execute(account_id_mock);

    const expected = { transactions: createdTransactionMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(transactionRepository, 'findByAccountId')
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
