import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCustomerService } from 'src/app/customer/usecases/create-customer/create-customer.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { CreateCustomerDto } from 'src/domain/dtos/customers/create-customer.dto';

@ApiTags('clientes')
@Controller('clientes')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um cliente' })
  @ApiCreatedResponse({ description: 'Cliente criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  @Post()
  async execute(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const result = await this.createCustomerService.execute(
        createCustomerDto,
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
