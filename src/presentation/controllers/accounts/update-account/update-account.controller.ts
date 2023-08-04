import { AccountNotFoundDoc } from '@common/docs/account/account-not-found.doc';
import { AccountSuccessDoc } from '@common/docs/account/account-success.doc';
import { BadRequestDoc } from '@common/docs/bad-request.doc';
import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
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
  @ApiOperation({
    summary: 'Atualizar número de uma conta.',
    description: 'Atualiza o account_id da conta',
  })
  @ApiQuery({
    name: 'account_id',
    type: String,
    required: true,
    description: 'account_id da conta que deseja atualizar. ',
  })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Conta atualizada com sucesso',
    type: AccountSuccessDoc,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    type: BadRequestDoc,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhuma conta encontrado',
    type: AccountNotFoundDoc,
  })
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
