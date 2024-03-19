import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeUtilsService {
  convertTimeToMilliseconds(
    unit: 'hours' | 'minutes' | 'seconds',
    value: number,
  ) {
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = 60 * millisecondsPerSecond;
    const millisecondsPerHour = 60 * millisecondsPerMinute;

    switch (unit.toLowerCase()) {
      case 'hours':
        return value * millisecondsPerHour;
      case 'minutes':
        return value * millisecondsPerMinute;
      case 'seconds':
        return value * millisecondsPerSecond;
      default:
        throw new Error(
          'Invalid time unit. Supported units are "hours", "minutes", or "seconds".',
        );
    }
  }

  convertToSeconds(
    type: 'day' | 'year' | 'minute' | 'month',
    value: number,
  ): number {
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;
    const daysInMonth = 30; // Assuming an average month

    let totalSeconds: number;

    switch (type.toLowerCase()) {
      case 'day':
        totalSeconds = value * hoursInDay * minutesInHour * secondsInMinute;
        break;
      case 'year':
        totalSeconds =
          value * 365 * hoursInDay * minutesInHour * secondsInMinute;
        break;
      case 'minute':
        totalSeconds = value * secondsInMinute;
        break;
      case 'month':
        totalSeconds =
          value * daysInMonth * hoursInDay * minutesInHour * secondsInMinute;
        break;
      default:
        totalSeconds = 0;
    }

    return totalSeconds;
  }
}
