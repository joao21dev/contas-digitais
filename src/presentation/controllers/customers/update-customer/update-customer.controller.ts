import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { CustomerNotFoundDoc } from '@common/docs/customers/customer-not-found.doc';
import { CustomerSuccessDoc } from '@common/docs/customers/customer-success.doc';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCustomerService } from 'src/app/customers/usecases/update-customer/update-customer.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { UpdateCustomerDto } from 'src/domain/dtos/customers/update-customer.dto';

@ApiTags('clientes')
@Controller('clientes')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerService: UpdateCustomerService) {}

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar dados de um cliente.',
    description: 'Atualiza um cliente',
  })
  @ApiQuery({
    name: 'customer_id',
    type: String,
    required: true,
    description:
      'Id do cliente que deseja atualizar. Exemplo: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
  })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Cliente atualizado com sucesso',
    type: CustomerSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhum cliente encontrado',
    type: CustomerNotFoundDoc,
  })
  async execute(
    @Param('id') id: number,
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
