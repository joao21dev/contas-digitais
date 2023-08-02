import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindByIdAccountService } from 'src/app/accounts/usecases/find-by-id-account/find-by-id-account.service';
import { ErrorLayerKind } from 'src/common/enums/error-layer.enum';
import { makeError } from 'src/common/functions/make-error';

@ApiTags('contas')
@Controller('contas')
export class FindByIdAccountController {
  constructor(
    private readonly findByIdAccountService: FindByIdAccountService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma conta pelo id' })
  @ApiOkResponse({ description: 'Conta encontrada com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro na validação dos dados' })
  async execute(@Param('id') id: string) {
    try {
      const result = await this.findByIdAccountService.execute(id);

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
