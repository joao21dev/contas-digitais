import { HttpStatus } from '@nestjs/common';
import { ErrorLayerKind } from '../enums/error-layer.enum';

export interface HttpErrorResponse {
  error: {
    message: string;
    statusCode: HttpStatus;
    layer: ErrorLayerKind;
    support: string;
  };
}
