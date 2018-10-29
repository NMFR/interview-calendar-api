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

  // Returns a Calendar that intresects this person calendar with the calendar parameter, or null if there is no intersection.
  getPossbileMeetingCalendar(calendar) {
    // TODO: check if person is a Person instance
    const intersectingCalendar =
      this.calendar && calendar && this.calendar.intersection(calendar);

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
