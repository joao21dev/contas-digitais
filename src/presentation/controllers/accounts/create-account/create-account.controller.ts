import { AccountSuccessDoc } from '@common/docs/account/account-success.doc';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { CreateAccountDto } from '@domain/dtos/account/create-account.dto';
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountService } from 'src/app/accounts/usecases/create-account/create-account.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('contas')
@Controller('contas')
export class CreateAccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma conta para um cliente.',
    description: 'Cria uma conta para um cliente',
  })
  @ApiOperation({ summary: 'Criar um cliente', description: 'Cria um cliente' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Conta criada com sucesso',
    type: AccountSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
  async execute(@Body() createAccountDto: CreateAccountDto) {
    try {
      const result = await this.createAccountService.execute(createAccountDto);

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
