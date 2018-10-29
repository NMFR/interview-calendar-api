import Person from './Person';

class AbstractPersonProvider {
  /* eslint-disable  class-methods-use-this, no-unused-vars */
  async get(idOrUsername, type) {
    throw new Error('Abstract method');
  }

  async set(person) {
    throw new Error('Abstract method');
  }
  /* eslint-enable  class-methods-use-this, no-unused-vars */

  // Get an array of Persons with the peopleJsons (parameter) that can meet with personJson (according with their calendars).
  //  personJson is and Object with id or username properties to indicate the Person and a optional type to ensure that person is of that type.
  //  peopleJsons is an array of Objects with the same format personJson parameter.
  async getPossbileMeetingPeople(personJson, peopleJsons) {
    const res = [];

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
        for (let i = 1; i < people.length; i += 1) {
          const otherPerson = people[i];

          if (otherPerson) {
            const meetingCalendar = person.getPossbileMeetingCalendar(
              otherPerson
            );

            if (meetingCalendar) {
              res.push(
                new Person(
                  otherPerson.id,
                  otherPerson.username,
                  otherPerson.type,
                  meetingCalendar
                )
              );
            }
          }
        }
      }
    }

    return res;
  }
}

export default AbstractPersonProvider;
