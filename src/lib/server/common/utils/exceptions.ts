import { HTTPException } from 'hono/http-exception';

import { StatusCodes } from '../../../utils/status-codes';

import type { ContentfulStatusCode } from 'hono/utils/http-status';

type ExceptionOptions = {
  message?: string;
  cause?: unknown;
};

const createError = (
  status: ContentfulStatusCode,
  defaultMessage: string,
  arg?: string | ExceptionOptions
) => {
  let message = defaultMessage;
  let options: ExceptionOptions = {};

  if (typeof arg === 'string') {
    message = arg;
  } else if (arg) {
    options = arg;
    message = arg.message ?? defaultMessage;
  }

  return new HTTPException(status, {
    message,
    cause: options.cause
  });
};

export function TooManyRequests(arg?: string | ExceptionOptions) {
  return createError(StatusCodes.TOO_MANY_REQUESTS, 'Too many requests', arg);
}

export function Forbidden(arg?: string | ExceptionOptions) {
  return createError(StatusCodes.FORBIDDEN, 'Forbidden', arg);
}

export function Unauthorized(arg?: string | ExceptionOptions) {
  return createError(StatusCodes.UNAUTHORIZED, 'Unauthorized', arg);
}

export function NotFound(arg?: string | ExceptionOptions) {
  return createError(StatusCodes.NOT_FOUND, 'Not Found', arg);
}

export function BadRequest(arg?: string | ExceptionOptions) {
  return createError(StatusCodes.BAD_REQUEST, 'Bad Request', arg);
}

export function InternalError(arg?: string | ExceptionOptions) {
  return createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Error', arg);
}
