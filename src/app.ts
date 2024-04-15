import { IRepository } from './repository/interface';
import { Repository } from './repository/repository';
import { PrismaWrapper } from './repository/prismaWrapper';
import { prisma }  from './repository/client';
import { Handler, initHandler } from './handler/handler';
import { initRouter } from './handler/router';
import { Server } from './entities/server/server';
import { logRequest, logResponse } from './utils/logger';
import { ITypeUsecase, initTypeUsecase } from './usecases/type/usecase';
import { ISchemaUsecase, initSchemaUsecase } from './usecases/schema/usecase';
import { ICalls } from './entities/calls/interface';
import { initTypeCalls } from './handler/type/api';
import { initSchemaCalls } from './handler/schema/api';

// init database
const databaseClient = new PrismaWrapper(prisma)

// init repository
const repository: IRepository = new Repository(databaseClient);

// init usecases
const typeUsecase: ITypeUsecase = initTypeUsecase(repository);
const schemaUsecase: ISchemaUsecase = initSchemaUsecase(repository);

// init APIs
const typeAPI: ICalls = initTypeCalls(typeUsecase);
const schemaAPI: ICalls = initSchemaCalls(schemaUsecase);

// init handler
const handler: Handler = initHandler(typeAPI, schemaAPI);

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

