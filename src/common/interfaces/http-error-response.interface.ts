import { ErrorLayerKind } from '@common/enums/error-layer.enum';
import { HttpStatus } from '@nestjs/common';

export interface HttpErrorResponse {
  error: {
    message: string;
    statusCode: HttpStatus;
    layer: ErrorLayerKind;
    support: string;
  };
}
