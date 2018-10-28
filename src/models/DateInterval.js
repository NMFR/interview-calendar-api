import isInteger from 'lodash/isInteger';

class DateInterval {
  static isValidDate(date) {
    return (
      date instanceof Date &&
      // Valid Date, same has: `date.toString() !== 'Invalid Date'`:
      isInteger(date.getTime())
    );
  }

  // Is a valid date for a DateInterval, for this the date hour must be rounded down, ie date has 0 minutes, seconds and milliseconds:
  static isValidIntervalDate(date) {
    return (
      date instanceof Date &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0 &&
      date.getMilliseconds() === 0
    );
  }

  static roundDateHour(date) {
    if (
      DateInterval.isValidDate(date) &&
      !DateInterval.isValidIntervalDate(date)
    ) {
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
    }
    return date;
  }

  // openIntervals is a boolean that indicates if the intervals limits are considered closed or openned for the intersection,
  //  ie if the intervals limits are the same should it be considered an intersection or not.
  static areIntersecting(dateInterval1, dateInterval2, openIntervals) {
    // TODO: check if dateInterval1 and dateInterval2 are DateInterval instances.
    if (dateInterval1.isValid() && dateInterval2.isValid()) {
      const dateInterval1IsBefore2 = openIntervals
        ? dateInterval1.endDate <= dateInterval2.startDate
        : dateInterval1.endDate < dateInterval2.startDate;
      const dateInterval1IsAfter2 = openIntervals
        ? dateInterval1.startDate >= dateInterval2.endDate
        : dateInterval1.startDate > dateInterval2.endDate;
      if (!(dateInterval1IsBefore2 || dateInterval1IsAfter2)) {
        return true;
      }
    }
    return false;
  }

  static intersection(dateInterval1, dateInterval2) {
    if (DateInterval.areIntersecting(dateInterval1, dateInterval2, true)) {
      return new DateInterval(
        Math.max(dateInterval1.startDate, dateInterval2.startDate),
        Math.min(dateInterval1.endDate, dateInterval2.endDate)
      );
    }
    return null;
  }

  static merge(dateInterval1, dateInterval2) {
    if (DateInterval.areIntersecting(dateInterval1, dateInterval2, false)) {
      return new DateInterval(
        Math.min(dateInterval1.startDate, dateInterval2.startDate),
        Math.max(dateInterval1.endDate, dateInterval2.endDate)
      );
    }
    return null;
  }

  constructor(startDate, endDate) {
    // TODO: throw error if dates are not numbers, strings or Date instances.
    // TODO: handle startDate and endDate property setters.
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);

    this.roundDateHours();
  }

  roundDateHours() {
    DateInterval.roundDateHour(this.startDate);
    DateInterval.roundDateHour(this.endDate);
  }

  isValid() {
    return (
      DateInterval.isValidIntervalDate(this.startDate) &&
      DateInterval.isValidIntervalDate(this.endDate) &&
      this.startDate < this.endDate
    );
  }

  intersection(dateInterval) {
    return DateInterval.intersection(this, dateInterval);
  }

  merge(dateInterval) {
    return DateInterval.merge(this, dateInterval);
  }
}

export default DateInterval;
