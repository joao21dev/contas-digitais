import { CreateAccountDto } from '@domain/dtos/account/create-account.dto';
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
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
  @ApiOperation({ summary: 'Criar uma conta' })
  @ApiCreatedResponse({ description: 'Conta criada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
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
