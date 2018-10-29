class AbstractPersonProvider {
  /* eslint-disable  class-methods-use-this, no-unused-vars */
  async get(idOrUsername, type) {
    throw new Error('Abstract method');
  }

  async set(person) {
    throw new Error('Abstract method');
  }
  /* eslint-enable  class-methods-use-this, no-unused-vars */

  // personJson is and Object with id or username properties to indicate the Person and a optional type to ensure that person is of that type.
  // peopleJsons is an array of Objects with the same format personJson parameter.
  async getPossbileMeetingCalendar(personJson, peopleJsons) {
    let meetingCalendar = null;

    if (personJson && peopleJsons && peopleJsons.length > 0) {
      // Get all Person objects in parallel:
      // TODO: implement a getMultiple method to avoid multiple parallel calls
      const people = await Promise.all(
        [personJson, ...peopleJsons].map(
          p => p && this.get(p.id || p.username, p.type || undefined)
        )
      );
      const person = people[0];

      if (person) {
        meetingCalendar = person.calendar;

        for (let i = 1; i < people.length; i += 1) {
          const otherPerson = people[i];

          if (otherPerson) {
            meetingCalendar = otherPerson.getPossbileMeetingCalendar(
              meetingCalendar
            );

            if (!meetingCalendar) {
              break;
            }
          }
        }
      }
    }

    return meetingCalendar;
  }
}

export default AbstractPersonProvider;
