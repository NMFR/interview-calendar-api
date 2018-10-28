import DateInterval from './DateInterval';
import Calendar from './Calendar';

describe('Calendar', () => {
  it('new Calendar().dateIntervals', () => {
    let calendar = new Calendar();
    expect(calendar.dateIntervals).toEqual([]);

    calendar = new Calendar([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T00:00:00'),
    ]);
    expect(calendar.dateIntervals).toEqual([]);

    calendar = new Calendar([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
    ]);
    expect(calendar.dateIntervals).toEqual([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
    ]);

    calendar = new Calendar([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
    ]);
    expect(calendar.dateIntervals).toEqual([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
    ]);

    calendar = new Calendar([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T10:00:00'),
      new DateInterval('2018-01-01T02:00:00', '2018-01-01T04:00:00'),
      new DateInterval('2018-01-01T09:00:00', '2018-01-01T11:00:00'),
    ]);
    expect(calendar.dateIntervals).toEqual([
      new DateInterval('2018-01-01T01:00:00', '2018-01-01T11:00:00'),
    ]);

    calendar = new Calendar([
      new DateInterval('2018-01-01T20:00:00', '2018-01-01T22:00:00'),
      new DateInterval('2018-01-01T10:00:00', '2018-01-01T12:00:00'),
      new DateInterval('2018-01-01T02:00:00', '2018-01-01T04:00:00'),
    ]);
    expect(calendar.dateIntervals).toEqual([
      new DateInterval('2018-01-01T02:00:00', '2018-01-01T04:00:00'),
      new DateInterval('2018-01-01T10:00:00', '2018-01-01T12:00:00'),
      new DateInterval('2018-01-01T20:00:00', '2018-01-01T22:00:00'),
    ]);
  });

  it('new Calendar().intersection()', () => {
    let calendar = new Calendar();
    let caledarToCheck = new Calendar();
    expect(calendar.intersection(caledarToCheck)).toEqual(new Calendar());

    calendar = new Calendar([
      new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
      new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
      new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
    ]);
    caledarToCheck = new Calendar([
      new DateInterval('2018-01-03T09:00:00', '2018-01-03T12:00:00'),
      new DateInterval('2018-01-05T09:00:00', '2018-01-05T10:00:00'),
    ]);
    expect(calendar.intersection(caledarToCheck)).toEqual(new Calendar());

    calendar = new Calendar([
      new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
      new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
      new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
    ]);
    caledarToCheck = new Calendar([
      new DateInterval('2018-01-01T09:00:00', '2018-01-01T10:00:00'),
      new DateInterval('2018-01-02T09:00:00', '2018-01-02T10:00:00'),
      new DateInterval('2018-01-03T09:00:00', '2018-01-03T12:00:00'),
      new DateInterval('2018-01-04T09:00:00', '2018-01-04T10:00:00'),
      new DateInterval('2018-01-05T09:00:00', '2018-01-05T10:00:00'),
    ]);
    expect(calendar.intersection(caledarToCheck)).toEqual(
      new Calendar([
        new DateInterval('2018-01-01T09:00:00', '2018-01-01T10:00:00'),
        new DateInterval('2018-01-02T09:00:00', '2018-01-02T10:00:00'),
        new DateInterval('2018-01-04T09:00:00', '2018-01-04T10:00:00'),
      ])
    );

    calendar = new Calendar([
      new DateInterval('2018-01-05T10:00:00', '2018-01-05T19:00:00'),
      new DateInterval('2018-01-04T11:00:00', '2018-01-04T18:00:00'),
      new DateInterval('2018-01-03T12:00:00', '2018-01-03T17:00:00'),
      new DateInterval('2018-01-02T13:00:00', '2018-01-02T16:00:00'),
      new DateInterval('2018-01-01T14:00:00', '2018-01-01T15:00:00'),
    ]);
    caledarToCheck = new Calendar([
      new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
      new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
      new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
    ]);
    expect(calendar.intersection(caledarToCheck)).toEqual(
      new Calendar([
        new DateInterval('2018-01-01T14:00:00', '2018-01-01T15:00:00'),
        new DateInterval('2018-01-02T13:00:00', '2018-01-02T16:00:00'),
        new DateInterval('2018-01-04T11:00:00', '2018-01-04T16:00:00'),
      ])
    );
  });
});
