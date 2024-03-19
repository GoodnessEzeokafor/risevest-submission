import { Injectable, HttpStatus } from '@nestjs/common';
import { IErrorResponse, ISuccessResponse, ResponseState } from 'src/core';

@Injectable()
export class ResponseUtilsService {
  public success201Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.CREATED,
    };
  }
  public success200Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.OK,
    };
  }

  public success202Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.ACCEPTED,
    };
  }

  public success204Response(payload: ISuccessResponse): ISuccessResponse {
    return {
      ...payload,
      state: ResponseState.SUCCESS,
      status: HttpStatus.NO_CONTENT,
    };
  }
  public errorResponse(payload: IErrorResponse): IErrorResponse {
    return {
      ...payload,
      state: ResponseState.ERROR,
      error: null,
    };
  }

  /**
   * Most of your error response would probably be a 400 status code error
   *
   * @param message
   * @returns
   */
  public error400Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.BAD_REQUEST,
    };
  }

  public error404Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.NOT_FOUND,
    };
  }

  public error409Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.CONFLICT,
    };
  }

  public error403Response(message: string): IErrorResponse {
    return {
      message,
      state: ResponseState.ERROR,
      error: null,
      status: HttpStatus.FORBIDDEN,
    };
  }
}
