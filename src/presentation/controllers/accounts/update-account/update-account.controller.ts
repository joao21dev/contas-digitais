import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import e from 'express';
import { UpdateAccountService } from 'src/app/accounts/usecases/update-account/update-account.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';
import { UpdateAccountDto } from 'src/domain/dtos/account/update-account.dto';

@ApiTags('contas')
@Controller('contas')
export class UpdateAccountController {
  constructor(private readonly updateAccountService: UpdateAccountService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma conta' })
  @ApiOkResponse({ description: 'Conta atualizada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(
    @Param('account_id') account_id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    try {
      const result = await this.updateAccountService.execute(
        updateAccountDto,
        account_id,
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
