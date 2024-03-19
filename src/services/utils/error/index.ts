import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseState } from 'src/core';

const ERROR_MESSAGE = 'An error occured, please contact support';
const ERROR_MESSAGES = [];

@Injectable()
export class ErrorUtilsService {
  errorMessage(error) {
    if (error.message) return error.message;
    if (error.responseMessage) return error.responseMessage; // external service
    return ERROR_MESSAGE;
  }

  public async error(payload: { error: any }) {
    const { error } = payload;
    console.log('====== error =======');
    console.log(error);
    console.log('====== error =======');

    const details = {
      technicalMessage: error.message,
      message: ERROR_MESSAGES.includes(error.message)
        ? error.message
        : 'An error has occurred, please contact support.',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      state: ResponseState.ERROR,
    };

    return details;
  }
}
