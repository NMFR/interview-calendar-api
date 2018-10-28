import DateInterval from './DateInterval';
import Calendar from './Calendar';
import Person from './Person';

describe('Person', () => {
  it('new Calendar().getPossbileMeetingCalendar()', () => {
    let person = new Person(1, 'John', Person.TYPE.INTERVIEWER);
    let personToCheck = new Person(2, 'Anna', Person.TYPE.CANDIDATE);
    expect(person.getPossbileMeetingCalendar(personToCheck)).toBeNull();

    person = new Person(
      1,
      'John',
      Person.TYPE.INTERVIEWER,
      new Calendar([
        new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
        new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
        new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
      ])
    );
    personToCheck = new Person(
      2,
      'Anna',
      Person.TYPE.CANDIDATE,
      new Calendar([
        new DateInterval('2018-01-03T09:00:00', '2018-01-03T12:00:00'),
        new DateInterval('2018-01-05T09:00:00', '2018-01-05T10:00:00'),
      ])
    );
    expect(person.getPossbileMeetingCalendar(personToCheck)).toBeNull();

    person = new Person(
      1,
      'John',
      Person.TYPE.INTERVIEWER,
      new Calendar([
        new DateInterval('2018-01-05T10:00:00', '2018-01-05T19:00:00'),
        new DateInterval('2018-01-04T11:00:00', '2018-01-04T18:00:00'),
        new DateInterval('2018-01-03T12:00:00', '2018-01-03T17:00:00'),
        new DateInterval('2018-01-02T13:00:00', '2018-01-02T16:00:00'),
        new DateInterval('2018-01-01T14:00:00', '2018-01-01T15:00:00'),
      ])
    );
    personToCheck = new Person(
      2,
      'Anna',
      Person.TYPE.CANDIDATE,
      new Calendar([
        new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
        new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
        new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
      ])
    );
    expect(person.getPossbileMeetingCalendar(personToCheck)).toEqual(
      new Calendar([
        new DateInterval('2018-01-01T14:00:00', '2018-01-01T15:00:00'),
        new DateInterval('2018-01-02T13:00:00', '2018-01-02T16:00:00'),
        new DateInterval('2018-01-04T11:00:00', '2018-01-04T16:00:00'),
      ])
    );
  });
});
