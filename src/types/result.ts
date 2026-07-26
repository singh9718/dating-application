export type ResultCode =
  | 'success'
  | 'validation_error'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'internal_error';

export interface ActionResult<T = undefined> {
  code: ResultCode;
  message: string;
  data?: T;
}

export function ok<T>(data: T, message = 'Success'): ActionResult<T> {
  return { code: 'success', message, data };
}

export function err(
  code: Exclude<ResultCode, 'success'>,
  message: string,
): ActionResult<never> {
  return { code, message };
}

export function isOk<T>(result: ActionResult<T>): result is ActionResult<T> & { data: T } {
  return result.code === 'success';
}
