import DateInterval from './DateInterval';

describe('DateInterval', () => {
  it('DateInterval.isValidDate()', () => {
    expect(DateInterval.isValidDate(null)).toEqual(false);
    expect(DateInterval.isValidDate(undefined)).toEqual(false);
    expect(DateInterval.isValidDate('some string')).toEqual(false);
    expect(DateInterval.isValidDate({})).toEqual(false);
    expect(DateInterval.isValidDate(1514764801000)).toEqual(false);
    expect(DateInterval.isValidDate(1514764800000)).toEqual(false);

    expect(DateInterval.isValidDate(new Date('2018-01-01T00:00:01'))).toEqual(
      true
    );
    expect(DateInterval.isValidDate(new Date('2018-01-01T00:00:00'))).toEqual(
      true
    );
  });

  it('DateInterval.isValidIntervalDate()', () => {
    expect(DateInterval.isValidIntervalDate(null)).toEqual(false);
    expect(DateInterval.isValidIntervalDate(undefined)).toEqual(false);
    expect(DateInterval.isValidIntervalDate('some string')).toEqual(false);
    expect(DateInterval.isValidIntervalDate({})).toEqual(false);
    expect(DateInterval.isValidIntervalDate(1514764801000)).toEqual(false);
    expect(DateInterval.isValidIntervalDate(1514764800000)).toEqual(false);
    expect(
      DateInterval.isValidIntervalDate(new Date('2018-01-01T00:00:01'))
    ).toEqual(false);

    expect(
      DateInterval.isValidIntervalDate(new Date('2018-01-01T00:00:00'))
    ).toEqual(true);
  });

  it('new DateInterval().isValid()', () => {
    let dateInterval = new DateInterval();
    expect(dateInterval.isValid()).toEqual(false);

    dateInterval = new DateInterval(null, null);
    expect(dateInterval.isValid()).toEqual(false);

    dateInterval = new DateInterval(
      '2018-01-01T01:00:00',
      '2018-01-01T00:00:00'
    );
    expect(dateInterval.isValid()).toEqual(false);

    dateInterval = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T00:00:00'
    );
    expect(dateInterval.isValid()).toEqual(false);

    dateInterval = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T00:00:01'
    );
    expect(dateInterval.isValid()).toEqual(false);

    dateInterval = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T01:00:00'
    );
    expect(dateInterval.isValid()).toEqual(true);
    expect(dateInterval.startDate).toEqual(new Date('2018-01-01T00:00:00'));
    expect(dateInterval.endDate).toEqual(new Date('2018-01-01T01:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T00:00:01',
      '2018-01-01T01:00:01'
    );
    expect(dateInterval.isValid()).toEqual(true);
    expect(dateInterval.startDate).toEqual(new Date('2018-01-01T00:00:00'));
    expect(dateInterval.endDate).toEqual(new Date('2018-01-01T01:00:00'));
  });

  it('new DateInterval().intersection()', () => {
    let dateInterval = new DateInterval();
    let dateIntervalToCheck;
    let intersectionDateInterval;
    expect(dateInterval.intersection(dateInterval)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T01:00:00'
    );
    expect(dateInterval.intersection(dateIntervalToCheck)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T09:00:00',
      '2018-01-01T10:00:00'
    );
    expect(dateInterval.intersection(dateIntervalToCheck)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T15:00:00',
      '2018-01-01T16:00:00'
    );
    expect(dateInterval.intersection(dateIntervalToCheck)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T16:00:00',
      '2018-01-01T20:00:00'
    );
    expect(dateInterval.intersection(dateIntervalToCheck)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T09:00:00',
      '2018-01-01T11:00:00'
    );
    intersectionDateInterval = dateInterval.intersection(dateIntervalToCheck);
    expect(intersectionDateInterval).not.toBeNull();
    expect(intersectionDateInterval.isValid()).toEqual(true);
    expect(intersectionDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(intersectionDateInterval.endDate).toEqual(
      new Date('2018-01-01T11:00:00')
    );

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T11:00:00'
    );
    intersectionDateInterval = dateInterval.intersection(dateIntervalToCheck);
    expect(intersectionDateInterval).not.toBeNull();
    expect(intersectionDateInterval.isValid()).toEqual(true);
    expect(intersectionDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(intersectionDateInterval.endDate).toEqual(
      new Date('2018-01-01T11:00:00')
    );

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T11:00:00',
      '2018-01-01T14:00:00'
    );
    intersectionDateInterval = dateInterval.intersection(dateIntervalToCheck);
    expect(intersectionDateInterval).not.toBeNull();
    expect(intersectionDateInterval.isValid()).toEqual(true);
    expect(intersectionDateInterval.startDate).toEqual(
      new Date('2018-01-01T11:00:00')
    );
    expect(intersectionDateInterval.endDate).toEqual(
      new Date('2018-01-01T14:00:00')
    );

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T11:00:00',
      '2018-01-01T17:00:00'
    );
    intersectionDateInterval = dateInterval.intersection(dateIntervalToCheck);
    expect(intersectionDateInterval).not.toBeNull();
    expect(intersectionDateInterval.isValid()).toEqual(true);
    expect(intersectionDateInterval.startDate).toEqual(
      new Date('2018-01-01T11:00:00')
    );
    expect(intersectionDateInterval.endDate).toEqual(
      new Date('2018-01-01T15:00:00')
    );

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T20:00:00'
    );
    intersectionDateInterval = dateInterval.intersection(dateIntervalToCheck);
    expect(intersectionDateInterval).not.toBeNull();
    expect(intersectionDateInterval.isValid()).toEqual(true);
    expect(intersectionDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(intersectionDateInterval.endDate).toEqual(
      new Date('2018-01-01T15:00:00')
    );
  });

  it('new DateInterval().merge()', () => {
    let dateInterval = new DateInterval();
    let dateIntervalToCheck;
    let mergedDateInterval;
    expect(dateInterval.merge(dateInterval)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T01:00:00'
    );
    expect(dateInterval.merge(dateIntervalToCheck)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T09:00:00',
      '2018-01-01T10:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T09:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T15:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T15:00:00',
      '2018-01-01T16:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T16:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T16:00:00',
      '2018-01-01T20:00:00'
    );
    expect(dateInterval.merge(dateIntervalToCheck)).toEqual(null);

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T09:00:00',
      '2018-01-01T11:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T09:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T15:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T11:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T15:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T11:00:00',
      '2018-01-01T14:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T15:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T11:00:00',
      '2018-01-01T17:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T10:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T17:00:00'));

    dateInterval = new DateInterval(
      '2018-01-01T10:00:00',
      '2018-01-01T15:00:00'
    );
    dateIntervalToCheck = new DateInterval(
      '2018-01-01T00:00:00',
      '2018-01-01T20:00:00'
    );
    mergedDateInterval = dateInterval.merge(dateIntervalToCheck);
    expect(mergedDateInterval).not.toBeNull();
    expect(mergedDateInterval.isValid()).toEqual(true);
    expect(mergedDateInterval.startDate).toEqual(
      new Date('2018-01-01T00:00:00')
    );
    expect(mergedDateInterval.endDate).toEqual(new Date('2018-01-01T20:00:00'));
  });
});
