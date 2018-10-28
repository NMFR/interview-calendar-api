# Interview calendar API

## Introduction

An interview calendar API.

There are two roles that use this API, a candidate and an interviewer.
A typical scenario is when:
1. An interview slot is a 1-hour period of time that spreads from the beginning of any hour until the beginning of the next hour.
For example, a time span between 9am and 10am is a valid interview slot, whereas between 9:30am and 10:30am it is not.
2. Each of the interviewers sets their availability slots.
For example, the interviewer Ines is available next week each day from 9am through 4pm without breaks and the interviewer Ingrid is available from 12pm to 6pm on Monday and Wednesday next week, and from 9am to 12pm on Tuesday and Thursday.
3. Each of the candidates sets their requested slots for the interview.
For example, the candidate Carl is available for the interview from 9am to 10am any weekday next week and from 10am to 12pm on Wednesday.
4. Anyone may then query the API to get a collection of periods of time when it’s possible arrange an interview for a particular candidate and one or more interviewers.
In this example, if the API is queried for the candidate Carl and interviewers Ines and Ingrid, the response should be a collection of 1-hour slots: from 9am to 10am on Tuesday, from 9am to 10am on Thursday.

## Requirements

You will need to have installed the following:

- [Node js](https://nodejs.org/en/) (^8.12.0)

For linux it might be easier to install node js via [nvm](https://github.com/creationix/nvm).

## Getting started

List of available shell commands (commands must be run from the project's folder context):

Note: Before any command is ran the project dependencies must be installed.

To install the dependencies run:
```
npm i
```

To start the API server run:
```
npm start
```

To start the API server with inspector enabled on port 8888 run:
```
npm run start-debug
```

This allows to debug the server via the inspector API, use vs code or chrome [chrome://inspect/#devices](chrome://inspect/#devices) for example to debug the server.

Run tests:
```
npm test
```

To format the code run (prettier):
```
npm run format
```

For the code linter (eslint) run:
```
npm run lint
```

For the code linter (eslint) with the fix option (automatically fix problems) run:
```
npm run lint-fix
```

## Development

This project uses ES6 modules.
`@babel/register` is used to support this (since node js does not supports ES6 modules yet).
The entry point file (`src/index.js`) loads `@babel/register` via `require`, after this any other files loaded with `required` will support ES6 modules.

### Code style

This project uses the code style from `prettier`.
Code style is enforced by `prettier` on every commit via a precommit hook, this means when a new commit is created `prettier` will run automatically and format the code maintaining a consistent code style across the project.

### Code linting

This project uses `eslint` and the airbnb (`eslint-config-airbnb`) rule set as a base, with some small rules overriden in `.eslintrc.js`, to lint the code.
The linter runs automatically on every commit via a precommit hook. If errors are found the commit will be aborted.
