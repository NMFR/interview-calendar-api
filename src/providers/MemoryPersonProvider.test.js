import DateInterval from '../models/DateInterval';
import Calendar from '../models/Calendar';
import Person from '../models/Person';
import MemoryPersonProvider from './MemoryPersonProvider';

describe('MemoryPersonProvider', () => {
  it('new MemoryPersonProvider().get()', async () => {
    const john = new Person(1, 'John', Person.TYPE.INTERVIEWER);
    const anna = new Person(2, 'Anna', Person.TYPE.CANDIDATE);

    const provider = new MemoryPersonProvider([john, anna]);

    await expect(provider.get(99)).resolves.toBeNull();
    await expect(provider.get(1, Person.TYPE.CANDIDATE)).resolves.toBeNull();
    await expect(provider.get(2, Person.TYPE.INTERVIEWER)).resolves.toBeNull();
    await expect(provider.get(1)).resolves.toEqual(john);
    await expect(provider.get(2)).resolves.toEqual(anna);
  });

  it('new MemoryPersonProvider().set()', async () => {
    const john = new Person(1, 'John', Person.TYPE.INTERVIEWER);
    const anna = new Person(2, 'Anna', Person.TYPE.CANDIDATE);

    const provider = new MemoryPersonProvider([]);

    await expect(provider.get(1)).resolves.toBeNull();
    await expect(provider.get(2)).resolves.toBeNull();

    await provider.set(john);

    await expect(provider.get(1)).resolves.toEqual(john);
    await expect(provider.get(2)).resolves.toBeNull();

    await provider.set(anna);

    await expect(provider.get(1)).resolves.toEqual(john);
    await expect(provider.get(2)).resolves.toEqual(anna);

    await provider.set(anna);

    expect(provider.people.length).toEqual(2);
    await expect(provider.get(1)).resolves.toEqual(john);
    await expect(provider.get(2)).resolves.toEqual(anna);
  });

  it('new MemoryPersonProvider().getPossbileMeetingPeople()', async () => {
    const john = new Person(
      1,
      'John',
      Person.TYPE.INTERVIEWER,
      new Calendar([
        new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
        new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
        new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
      ])
    );
    const jane = new Person(
      2,
      'Jane',
      Person.TYPE.INTERVIEWER,
      new Calendar([
        new DateInterval('2018-01-01T12:00:00', '2018-01-01T20:00:00'),
        new DateInterval('2018-01-02T12:00:00', '2018-01-02T20:00:00'),
        new DateInterval('2018-01-03T12:00:00', '2018-01-03T20:00:00'),
        new DateInterval('2018-01-04T12:00:00', '2018-01-04T20:00:00'),
        new DateInterval('2018-01-05T12:00:00', '2018-01-05T20:00:00'),
      ])
    );
    const anna = new Person(
      3,
      'Anna',
      Person.TYPE.CANDIDATE,
      new Calendar([
        new DateInterval('2018-01-01T10:00:00', '2018-01-01T12:00:00'),
        new DateInterval('2018-01-02T11:00:00', '2018-01-02T14:00:00'),
        new DateInterval('2018-01-05T16:00:00', '2018-01-05T22:00:00'),
      ])
    );
    const felix = new Person(
      4,
      'Felix',
      Person.TYPE.CANDIDATE,
      new Calendar([
        new DateInterval('2018-01-03T22:00:00', '2018-01-03T23:00:00'),
        new DateInterval('2018-01-05T22:00:00', '2018-01-05T23:00:00'),
        new DateInterval('2018-01-05T22:00:00', '2018-01-05T23:00:00'),
      ])
    );

    const provider = new MemoryPersonProvider([john, jane, anna, felix]);

    await expect(
      provider.getPossbileMeetingPeople({ id: felix.id }, [
        { id: john.id },
        { username: jane.username },
      ])
    ).resolves.toEqual([]);

    await expect(
      provider.getPossbileMeetingPeople({ id: anna.id }, [
        { id: john.id },
        { username: jane.username },
      ])
    ).resolves.toEqual([
      new Person(
        1,
        'John',
        Person.TYPE.INTERVIEWER,
        new Calendar([
          new DateInterval('2018-01-01T10:00:00', '2018-01-01T12:00:00'),
          new DateInterval('2018-01-02T11:00:00', '2018-01-02T14:00:00'),
        ])
      ),
      new Person(
        2,
        'Jane',
        Person.TYPE.INTERVIEWER,
        new Calendar([
          new DateInterval('2018-01-02T12:00:00', '2018-01-02T14:00:00'),
          new DateInterval('2018-01-05T16:00:00', '2018-01-05T20:00:00'),
        ])
      ),
    ]);

    await expect(
      provider.getPossbileMeetingPeople(
        { id: anna.id, type: Person.TYPE.INTERVIEWER },
        [{ id: john.id }, { username: jane.username }]
      )
    ).resolves.toEqual([]);

    await expect(
      provider.getPossbileMeetingPeople({ id: anna.id }, [
        { id: john.id, type: Person.TYPE.CANDIDATE },
        { username: jane.username },
      ])
    ).resolves.toEqual([
      new Person(
        2,
        'Jane',
        Person.TYPE.INTERVIEWER,
        new Calendar([
          new DateInterval('2018-01-02T12:00:00', '2018-01-02T14:00:00'),
          new DateInterval('2018-01-05T16:00:00', '2018-01-05T20:00:00'),
        ])
      ),
    ]);
  });
});
