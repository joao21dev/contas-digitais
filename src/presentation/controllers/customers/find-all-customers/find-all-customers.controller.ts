import { FindAllCustomersService } from '@app/customers/usecases/find-all-customers/find-all-customers.service';
import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { makeError } from '@common/functions/make-error';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class FindAllCustomersController {
  constructor(
    private readonly findAllCustomersService: FindAllCustomersService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiOkResponse({ description: 'Clientes listados com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
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
