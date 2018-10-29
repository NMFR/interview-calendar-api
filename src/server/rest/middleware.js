import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

const errorHandler = (err, req, res, next) => {
  next(
    `ERROR ${new Date().toISOString()} express route:\n${req.method}\n${
      req.url
    }\n${(err && err.stack) || err}`
  );
};

export { jsonParser, errorHandler };
