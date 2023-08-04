import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@infra/database/config/database.config';
import entities from '@domain/entities';
import createdCustomerMock from '@common/mocks/created-customer.mock';
import { makeError } from '@common/functions/make-error';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';
import { CreateTransactionService } from './create-transaction.service';
import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import { PostgresTransactionsRepository } from '@infra/database/postgres/transactions.repository';
import createdTransactionMock from '@common/mocks/createdTransaction.mock';

describe('CreateTransactionService', () => {
  let sut: CreateTransactionService;
  let transactionRepository: TransactionRepository;
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
        CreateTransactionService,
        {
          provide: TransactionRepository,
          useClass: PostgresTransactionsRepository,
        },
      ],
    }).compile();

    sut = module.get<CreateTransactionService>(CreateTransactionService);
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

  it('should be able to create a transaction', async () => {
    jest
      .spyOn(transactionRepository, 'create')
      .mockResolvedValue(createdTransactionMock as any);

    const result = await sut.execute(createdTransactionMock as any);

    const expected = { transaction: createdTransactionMock };

    expect(result).toEqual(expected);
  });

  it('should be able to return object error if service not work', async () => {
    jest
      .spyOn(transactionRepository, 'create')
      .mockRejectedValue(new Error('Service error'));

    const result = await sut.execute(createdTransactionMock as any);

    const expected = makeError({
      layer: ErrorLayerKind.SERVICE_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Service error',
    });

    expect(result).toEqual(expected);
  });
});
