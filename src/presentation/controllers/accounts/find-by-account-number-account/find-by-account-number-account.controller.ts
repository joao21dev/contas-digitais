import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindByAccountNumberAccountService } from 'src/app/accounts/usecases/find-by-account-number-account/find-by-account-number-account.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('contas')
@Controller('contas')
export class FindByAccountNumberAccountController {
  constructor(
    private readonly findByAccountNumberAccountService: FindByAccountNumberAccountService,
  ) {}

  @Get('/numero/:account_number')
  @ApiOperation({ summary: 'Buscar uma conta pelo número da conta' })
  @ApiCreatedResponse({ description: 'Conta encontrada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Param('account_number') account_number: number) {
    try {
      const result = await this.findByAccountNumberAccountService.execute(
        account_number,
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
