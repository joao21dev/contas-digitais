import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import { PostgresTransactionsRepository } from '@infra/database/postgres/transactions.repository';
import { FindByIdTransactionService } from './find-by-id-transaction.service';
import createdTransactionMock from '@common/mocks/createdTransaction.mock';

describe('FindByIdTransactionService', () => {
  let sut: FindByIdTransactionService;
  let transactionRepository: TransactionRepository;
  let module: TestingModule;
  const id = 1;

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
        FindByIdTransactionService,
        {
          provide: TransactionRepository,
          useClass: PostgresTransactionsRepository,
        },
      ],
    }).compile();

    sut = module.get<FindByIdTransactionService>(FindByIdTransactionService);
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

  it('should be able to find transaction by transaction_id', async () => {
    jest
      .spyOn(transactionRepository, 'findById')
      .mockResolvedValue(createdTransactionMock as any);

    const result = await sut.execute(id);

    const expected = { transaction: createdTransactionMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(transactionRepository, 'findById')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(id);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
