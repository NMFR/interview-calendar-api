import findIndex from 'lodash/findIndex';

import AbstractPersonProvider from '../models/AbstractPersonProvider';

class MemoryPersonProvider extends AbstractPersonProvider {
  constructor(people) {
    super();
    // TODO: check if people is an Array of Person instances
    this.people = (people || []).filter(p => !!p);
  }

  async get(idOrUsername, type) {
    return (
      this.people.find(
        p =>
          (p.id === idOrUsername || p.username === idOrUsername) &&
          (!type || p.type === type)
      ) || null
    );
  }

  async set(person) {
    // TODO: check if person is a Person instance
    if (person) {
      // TODO: check if person has id and username.
      const personIndex = findIndex(
        this.people,
        p => p.id === person.id || p.username === person.username
      );

      if (personIndex >= 0) {
        this.people[personIndex] = person;
      } else {
        this.people.push(person);
      }
    }
  }
}

export default MemoryPersonProvider;
