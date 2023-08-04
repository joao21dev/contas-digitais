import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { CustomerSuccessDoc } from '@common/docs/customers/customer-success.doc';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCustomerService } from 'src/app/customers/usecases/create-customer/create-customer.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { CreateCustomerDto } from 'src/domain/dtos/customers/create-customer.dto';

@ApiTags('clientes')
@Controller('clientes')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um cliente', description: 'Cria um cliente' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cliente criado com sucesso',
    type: CustomerSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
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
