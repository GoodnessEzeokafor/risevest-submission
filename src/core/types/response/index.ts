import { HttpStatus } from '@nestjs/common';

export enum ResponseState {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ISuccessResponse = {
  message: string;
  token?: string;
  data: Record<string, any> | string | number;
  status?: HttpStatus;
  state?: ResponseState;
  pagination?: {
    hasPrevious: boolean;
    prevPage: number;
    hasNext: boolean;
    next: number;
    currentPage: number;
    pageSize: number;
    lastPage: number;
    total: any;
  };
};

export type IErrorResponse = {
  status?: HttpStatus;
  message: string;
  error?: null;
  state?: ResponseState;
};
export type IResponse = ISuccessResponse | IErrorResponse;
