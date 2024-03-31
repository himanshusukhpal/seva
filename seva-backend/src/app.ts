import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './app/middleware/error-handler.middleware';

import { AuthMiddleware } from './app/middleware/auth.middleware';

import { AuthController } from './app/controllers/authorize/authorize.controller';
import { AccountController } from './app/controllers/account/account.controller';

const app = express();

const PORT = process.env.PORT || 8080;

const corsOption = {
  origin: 'http://localhost:8100'
};

app.use(cors(corsOption));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get('/', (_req, res) => {
  res.send('Welcome to EMP api.');
});

app.use('/api/auth', (new AuthController()).router);

app.all('/api/*', (new AuthMiddleware()).verifyAccountAccess);

app.use('/api/account', (new AccountController()).router);

app.all('/api/admin/*', (new AuthMiddleware()).verifySuperAdminAccountAccess);

app.use(errorHandler);

export { app, PORT };
