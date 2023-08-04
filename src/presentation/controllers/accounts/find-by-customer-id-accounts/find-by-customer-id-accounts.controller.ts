import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
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
  @ApiOperation({ summary: 'Buscar contas por id do cliente' })
  @ApiOkResponse({ description: 'Contas encontradas com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
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
