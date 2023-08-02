import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindByIdCustomerService } from 'src/app/customer/usecases/find-by-id-customer/find-by-id-customer.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('clientes')
@Controller('clientes')
export class FindByIdCustomerController {
  constructor(
    private readonly findByIdCustomerService: FindByIdCustomerService,
  ) {}

  @ApiOperation({ summary: 'Buscar um cliente pelo id' })
  @ApiOkResponse({ description: 'Cliente encontrado com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  @Get(':id')
  async execute(@Param('id') id: string) {
    try {
      const result = await this.findByIdCustomerService.execute(id);

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
