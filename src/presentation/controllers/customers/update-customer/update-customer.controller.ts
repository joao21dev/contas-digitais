import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCustomerService } from 'src/app/customer/usecases/update-customer/update-customer.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { UpdateCustomerDto } from 'src/domain/dtos/customers/update-customer.dto';

@ApiTags('clientes')
@Controller('clientes')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerService: UpdateCustomerService) {}

  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiOkResponse({ description: 'Cliente atualizado com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  @Patch(':id')
  async execute(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      const result = await this.updateCustomerService.execute(
        updateCustomerDto,
        id,
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
