import { FindAllCustomersService } from '@app/customers/usecases/find-all-customers/find-all-customers.service';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { CustomerNotFoundDoc } from '@common/docs/customers/customer-not-found.doc';
import { CustomerSuccessDoc } from '@common/docs/customers/customer-success.doc';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class FindAllCustomersController {
  constructor(
    private readonly findAllCustomersService: FindAllCustomersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os clientes',
    description: 'Lista todos os clientes',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Clientes listados com sucesso',
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
  async execute() {
    try {
      const result = await this.findAllCustomersService.execute();

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
