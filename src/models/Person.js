import Calendar from './Calendar';

class Person {
  constructor(id, username, type, calendar) {
    if (type && !Object.values(Person.TYPE).find(t => type === t)) {
      throw new Error('Invalid type');
    }
    if (calendar && !(calendar instanceof Calendar)) {
      throw new Error('Invalid calendar (must be a Calendar)');
    }

    this.id = id;
    this.username = username;
    this.type = type;
    this.calendar = calendar || new Calendar();
  }

  // Returns a Calendar instance if this Person and the person's (parameter) calendar have periods of time in common,
  //  ie will return a Calendar with DateIntervals when this Person and person (parameter) are available to meet or null if their
  //  calendars don't have periods that intersect
  getPossbileMeetingCalendar(person) {
    // TODO: check if person is a Person instance
    const intersectingCalendar =
      this.calendar && person && this.calendar.intersection(person.calendar);

    if (
      intersectingCalendar &&
      intersectingCalendar.dateIntervals &&
      intersectingCalendar.dateIntervals.length > 0
    ) {
      return intersectingCalendar;
    }
    return null;
  }
}
Person.TYPE = {
  CANDIDATE: 'CANDIDATE',
  INTERVIEWER: 'INTERVIEWER',
};

export default Person;
