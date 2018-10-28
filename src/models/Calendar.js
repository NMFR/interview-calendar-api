class Calendar {
  static mergeDateIntervals(dateIntervals) {
    const mergedDateIntervals = [];

    if (dateIntervals) {
      // TODO: check if dateIntervals is an array with DateInterval objects
      dateIntervals.forEach(dateInterval => {
        if (dateInterval && dateInterval.isValid()) {
          for (let i = 0; i < mergedDateIntervals.length; i += 1) {
            const newDateInterval = mergedDateIntervals[i];
            const mergedInterval = newDateInterval.merge(dateInterval);

            if (mergedInterval) {
              mergedDateIntervals[i] = mergedInterval;
              return;
            }
          }

          mergedDateIntervals.push(dateInterval);
        }
      });
    }

    return mergedDateIntervals;
  }

  static uniformDateIntervals(dateIntervals) {
    const mergedDateIntervals = Calendar.mergeDateIntervals(dateIntervals);

    mergedDateIntervals.sort((a, b) => a.startDate - b.startDate);

    return mergedDateIntervals;
  }

  static intersection(calendar1, calendar2) {
    // TODO: check if calendar1 and calendar2 are Calender instances
    const intersectingDateIntervals = [];

    if (
      calendar1 &&
      calendar1.dateIntervals &&
      calendar2 &&
      calendar2.dateIntervals
    ) {
      calendar1.dateIntervals.forEach(dateInterval1 => {
        calendar2.dateIntervals.forEach(dateInterval2 => {
          const intersectingDateInterval =
            dateInterval1 && dateInterval1.intersection(dateInterval2);
          if (intersectingDateInterval) {
            intersectingDateIntervals.push(intersectingDateInterval);
          }
        });
      });
    }

    return new Calendar(intersectingDateIntervals);
  }

  constructor(dateIntervals) {
    this.dateIntervals = Calendar.uniformDateIntervals(dateIntervals);
  }

  intersection(calendar) {
    return Calendar.intersection(this, calendar);
  }
}

export default Calendar;
