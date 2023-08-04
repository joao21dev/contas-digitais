import { FindByCustomerIdCustomerService } from '@app/customers/usecases/find-by-customer-id-customer/find-by-customer-id-customer.service';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('clientes')
@Controller('clientes')
export class FindByCustomerIdCustomerController {
  constructor(
    private readonly findByCustomerIdCustomerService: FindByCustomerIdCustomerService,
  ) {}

  @Get(':customer_id')
  @ApiOperation({ summary: 'Buscar um cliente pelo customer_id' })
  @ApiOkResponse({ description: 'Cliente encontrado com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Param('customer_id') customer_id: number) {
    try {
      const result = await this.findByCustomerIdCustomerService.execute(
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
