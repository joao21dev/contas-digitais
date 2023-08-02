import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('App') // Define a tag para o controlador de aplicativo
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Obter mensagem de saudação',
    description: 'Endpoint para obter a mensagem de saudação "Hello World".',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de saudação',
    type: String,
  })
  getHello(): string {
    return 'Hello World';
  }
}
