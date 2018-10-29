import express from 'express';

import { jsonParser, errorHandler } from './middleware';
import routes from './routes';

export default function createServer(port, context) {
  const app = express();

  app.locals = context;

  app.disable('x-powered-by');

  app.use(jsonParser);

  app.use('/', routes);

  // This is the express error handler, it must be the last handler to be registered.
  app.use(errorHandler);

  app.listen(port, () => {
    console.info('Listening on port %d', port); // TODO: switch console with a logger
  });
}
