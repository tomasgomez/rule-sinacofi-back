import { IRepository } from './interfaces/repository';
import { Repository } from './repository/repository';
import { PrismaWrapper } from './repository/prismaWrapper';
import { prisma }  from './repository/client';
import { Usecase, initUsecase } from './usecases/usecases';
import { Handler, initHandler } from './handler/handler';
import { initRouter } from './handler/router';
import { Server } from './entities/server';
import { logRequest, logResponse } from './utils/logger';

// init database
const databaseClient = new PrismaWrapper(prisma)

// init repository
const repository: IRepository = new Repository(databaseClient);

// init usecases
const usecases: Usecase = initUsecase(repository);

// init handler
const handler: Handler = initHandler(usecases);

// init router
const router = initRouter(handler);

// create server
const server = new Server();

// set request logger
server.setLogger(logRequest);

// set router
server.setRoutes(router);

// set response logger
server.setLogger(logResponse);

// start server
server.start(3000);

