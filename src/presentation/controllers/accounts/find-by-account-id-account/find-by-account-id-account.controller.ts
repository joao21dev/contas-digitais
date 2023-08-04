import { FindByAccountIdAccountService } from '@app/accounts/usecases/find-by-account-id-account/find-by-account-id-account.service';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
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
  @ApiOperation({ summary: 'Buscar uma conta pelo account_id' })
  @ApiOkResponse({ description: 'Conta encontrada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
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
