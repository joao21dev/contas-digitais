import { AccountNotFoundDoc } from '@common/docs/account/account-not-found.doc';
import { AccountSuccessDoc } from '@common/docs/account/account-success.doc';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindByCustomerIdAccountsService } from 'src/app/accounts/usecases/find-by-customer-id-accounts/find-by-customer-id-accounts.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('contas')
@Controller('contas')
export class FindByCustomerIdAccountController {
  constructor(
    private readonly findByCustomerIdAccountsService: FindByCustomerIdAccountsService,
  ) {}

  @Get('cliente/:customer_id')
  @ApiOperation({
    summary: 'Buscar contas por id do cliente',
    description: 'Encontrar contas de um cliente pelo customer_id',
  })
  @ApiQuery({
    name: 'customer_id',
    type: String,
    required: true,
    description:
      'Id do cliente que deseja encontrar as contas. Exemplo: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Contas encontradas com sucesso',
    type: AccountSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhum cliente encontrado',
    type: AccountNotFoundDoc,
  })
  async execute(@Param('customer_id') customer_id: number) {
    try {
      const result = await this.findByCustomerIdAccountsService.execute(
        customer_id,
      );

      return result;
    } catch (error) {
      return makeError({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        layer: ErrorLayerKind.CONTROLLER_ERROR,
      });
    }
  }
}
