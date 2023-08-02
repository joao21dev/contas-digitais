import { HttpStatus } from '@nestjs/common';
import { ErrorLayerKind } from '../enums/error-layer.enum';

interface MakeErrorProps {
  message: string;
  layer: ErrorLayerKind;
  status: HttpStatus;
}

export const makeError = (error: MakeErrorProps) => {
  return {
    error: {
      statusCode: error.status,
      message: error.message,
      layer: error.layer,
      support: 'If the error persists, send this information to support',
    },
  };
};
