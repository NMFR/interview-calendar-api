import MemoryPersonProvider from './providers/MemoryPersonProvider';
import createRestServer from './server/rest';
import { Person, Calendar, DateInterval } from './models';

const ines = new Person(
  1,
  'Ines',
  Person.TYPE.INTERVIEWER,
  new Calendar([
    new DateInterval('2018-01-01T09:00:00', '2018-01-01T16:00:00'),
    new DateInterval('2018-01-02T09:00:00', '2018-01-02T16:00:00'),
    new DateInterval('2018-01-03T09:00:00', '2018-01-03T16:00:00'),
    new DateInterval('2018-01-04T09:00:00', '2018-01-04T16:00:00'),
    new DateInterval('2018-01-05T09:00:00', '2018-01-05T16:00:00'),
  ])
);
const ingrid = new Person(
  2,
  'Ingrid',
  Person.TYPE.INTERVIEWER,
  new Calendar([
    new DateInterval('2018-01-01T12:00:00', '2018-01-01T18:00:00'),
    new DateInterval('2018-01-02T09:00:00', '2018-01-02T12:00:00'),
    new DateInterval('2018-01-03T12:00:00', '2018-01-03T18:00:00'),
    new DateInterval('2018-01-04T09:00:00', '2018-01-04T12:00:00'),
  ])
);
const carl = new Person(
  2,
  'Carl',
  Person.TYPE.CANDIDATE,
  new Calendar([
    new DateInterval('2018-01-01T09:00:00', '2018-01-01T10:00:00'),
    new DateInterval('2018-01-02T09:00:00', '2018-01-02T10:00:00'),
    new DateInterval('2018-01-03T09:00:00', '2018-01-03T12:00:00'),
    new DateInterval('2018-01-04T09:00:00', '2018-01-04T10:00:00'),
    new DateInterval('2018-01-05T09:00:00', '2018-01-05T10:00:00'),
  ])
);

const personProvider = new MemoryPersonProvider([ines, ingrid, carl]);

const port = 3000; // TODO: fetch this from a config file
createRestServer(port, {
  personProvider,
});
