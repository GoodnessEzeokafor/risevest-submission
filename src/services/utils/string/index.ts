import { Injectable } from '@nestjs/common';

@Injectable()
export class StringUtilsService {
  /**
   * @method isEmpty
   * @param {String | Number | Object} value
   * @returns {Boolean} true & false
   * @description this value is Empty Check
   */
  public isEmpty(value: string | number | object): boolean {
    if (value === null) {
      return true;
    } else if (typeof value !== 'number' && value === '') {
      return true;
    } else if (typeof value === 'undefined' || value === undefined) {
      return true;
    } else {
      return (
        value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length
      );
    }
  }

  /**
   * @method isNotEmpty
   * @param {String | Number | Object} value
   * @returns {Boolean} true & false
   * @description this value is not Empty Check
   */
  public isNotEmpty(value: string | number | object): boolean {
    return !this.isEmpty(value);
  }

  toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
