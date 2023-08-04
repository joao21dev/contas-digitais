import { FindByAccountIdAccountService } from '@app/accounts/usecases/find-by-account-id-account/find-by-account-id-account.service';
import { AccountSuccessDoc } from '@common/docs/account/account-success.doc';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { CustomerNotFoundDoc } from '@common/docs/customers/customer-not-found.doc';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('contas')
@Controller('contas')
export class FindByAccountIdAccountController {
  constructor(
    private readonly findByAccountIdAccountService: FindByAccountIdAccountService,
  ) {}

  @Get(':account_id')
  @ApiOperation({
    summary: 'Buscar uma conta pelo account_id',
    description: 'Encontrar uma conta pelo seu account_id',
  })
  @ApiQuery({
    name: 'account_id',
    type: String,
    required: true,
    description: 'Id da conta que deseja encontrar.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Conta encontrado com sucesso',
    type: AccountSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhuma conta encontrada',
    type: CustomerNotFoundDoc,
  })
  async execute(@Param('account_id') account_id: number) {
    try {
      const result = await this.findByAccountIdAccountService.execute(
        account_id,
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
