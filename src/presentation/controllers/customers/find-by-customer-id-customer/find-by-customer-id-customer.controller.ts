import { FindByCustomerIdCustomerService } from '@app/customers/usecases/find-by-customer-id-customer/find-by-customer-id-customer.service';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { CustomerNotFoundDoc } from '@common/docs/customers/customer-not-found.doc';
import { CustomerSuccessDoc } from '@common/docs/customers/customer-success.doc';
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

@ApiTags('clientes')
@Controller('clientes')
export class FindByCustomerIdCustomerController {
  constructor(
    private readonly findByCustomerIdCustomerService: FindByCustomerIdCustomerService,
  ) {}

  @Get(':customer_id')
  @ApiOperation({
    summary: 'Econtra cliente pelo customer_id',
    description: 'Encontra o cliente pelo customer_id',
  })
  @ApiQuery({
    name: 'customer_id',
    type: String,
    required: true,
    description:
      'Id do cliente que deseja encontrar. Exemplo: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Cliente encontrado com sucesso',
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
