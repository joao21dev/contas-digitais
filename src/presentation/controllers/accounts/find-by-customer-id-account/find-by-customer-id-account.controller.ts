import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindByCustomerIdAccountService } from 'src/app/accounts/usecases/find-by-customer-id-account/find-by-customer-id-account.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('contas')
@Controller('contas')
export class FindByCustomerIdAccountController {
  constructor(
    private readonly findByCustomerIdAccountService: FindByCustomerIdAccountService,
  ) {}

  @Get('cliente/:customer_id')
  @ApiOperation({ summary: 'Buscar contas por id do cliente' })
  @ApiOkResponse({ description: 'Contas encontradas com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Param('customer_id') customer_id: string) {
    try {
      const result = await this.findByCustomerIdAccountService.execute(
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
