import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './app/middleware/error-handler.middleware';

import { AuthMiddleware } from './app/middleware/auth.middleware';

import { AuthController } from './app/controllers/authorize/authorize.controller';
import { AccountController } from './app/controllers/account/account.controller';

const app = express();

const PORT = process.env.PORT || 8090;

const corsOption = {
  origin: [
    'http://localhost:8100',
    'http://localhost:8101'
  ]
};

const apiRouter = express.Router();

app.use(cors(corsOption));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get('/', (_req, res) => {
  res.send('Welcome to Seva api.');
});

app.use('/api/auth', (new AuthController()).router);

apiRouter.use((req, res, next) => {
  (new AuthMiddleware()).verifyAccountAccess(req, res, next);
});
apiRouter.use('/account', (new AccountController()).router);
apiRouter.use('/address', (new AccountController()).router);

app.use('/api', apiRouter);

app.use(errorHandler);

export { app, PORT };
