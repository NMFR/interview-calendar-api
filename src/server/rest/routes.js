import express from 'express';
import wrap from 'express-async-wrap';
import { Person } from '../../models';

function isIntegerString(str) {
  return !!(str && str.match(/^-?\d+$/g)) || false;
}

const getCandidateInterviewSchedules = wrap(async (req, res) => {
  const { personProvider } = req.app.locals;
  if (!personProvider) {
    console.error(
      'getCandidateInterviewSchedules() Error: No personProvider found'
    ); // TODO: switch console with a logger
    return res.status.send({
      sucess: false,
      error: true,
      message: 'Internal server error',
    });
  }

  const interviewers = (Array.isArray(req.query.interviewer)
    ? req.query.interviewer
    : [req.query.interviewer]
  ).filter(i => !!i);
  const interviewersJsons = interviewers.map(i => {
    const interviewer = isIntegerString(i)
      ? { id: Number(i) }
      : { username: i };

    interviewer.type = Person.TYPE.INTERVIEWER;

    return interviewer;
  });
  const { candidate } = req.params;
  const candidateJson = isIntegerString(candidate)
    ? { id: Number(candidate) }
    : { username: candidate };

  candidateJson.type = Person.TYPE.CANDIDATE;

  const calendar = await personProvider.getPossbileMeetingCalendar(
    candidateJson,
    interviewersJsons
  );

  return res.json({
    sucess: true,
    data:
      (calendar &&
        calendar.dateIntervals &&
        calendar.dateIntervals.map(dt => ({
          start: dt.startDate,
          end: dt.endDate,
        }))) ||
      [],
  });
});

const router = express.Router();

router.get(
  '/candidates/:candidate/interviews/schedules',
  getCandidateInterviewSchedules
);

export default router;
