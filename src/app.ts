import { PrismaWrapper } from './repository/prismaWrapper';
import { prisma }  from './repository/client';
import { Handler, initHandler } from './handler/handler';
import { initRouter } from './handler/router';
import { Server } from './entities/server/server';
import { logRequest, logResponse } from './utils/logger';
import { ITypeUsecase } from './usecases/type/usecase';
import { ISchemaUsecase } from './usecases/schema/usecase';
import { initTypeCalls } from './handler/type/api';
import { initSchemaCalls } from './handler/schema/api';
import { ISchemaRepository } from './repository/schema/interface';
import { initSchemaRepository } from './repository/schema/repository';
import { IRuleRepository } from './repository/rule/interface';
import { initRuleRepository } from './repository/rule/repository';
import { IEventRepository } from './repository/event/interface';
import { initEventRepository } from './repository/event/repository';
import { initTypeUsecase } from './usecases/type/type';
import { initSchemaUsecase } from './usecases/schema/schema';
import { initRuleCalls } from './handler/rule/api';
import { IRuleUsecase } from './usecases/rule/usecase';
import { initRuleUsecase } from './usecases/rule/rule';
import { ISchemaAPI } from './handler/schema/interface';
import { IRuleAPI } from './handler/rule/interface';
import { ITypeAPI } from './handler/type/interface';
import { initMessageUsecase } from './usecases/message/message';
import { IMessageUsecase } from './usecases/message/usecase';
import { IEventUsecase } from './usecases/event/usecase';
import { initEventUsecase } from './usecases/event/event';

// init database
const databaseClient = new PrismaWrapper(prisma)

// init repositories
const schemaRepository: ISchemaRepository = initSchemaRepository(databaseClient);
const ruleRepository: IRuleRepository = initRuleRepository(databaseClient);
const eventRepository: IEventRepository = initEventRepository(databaseClient);

// init usecases
const typeUsecase: ITypeUsecase = initTypeUsecase(schemaRepository);
const schemaUsecase: ISchemaUsecase = initSchemaUsecase(schemaRepository);
const messageUsecase: IMessageUsecase = initMessageUsecase()

const eventUsecase: IEventUsecase = initEventUsecase(eventRepository, messageUsecase);
const ruleUsecase: IRuleUsecase = initRuleUsecase(ruleRepository);

// init APIs
const typeAPI: ITypeAPI = initTypeCalls(typeUsecase);
const schemaAPI: ISchemaAPI = initSchemaCalls(schemaUsecase);
const ruleAPI: IRuleAPI = initRuleCalls(ruleUsecase);

// init handler
const handler: Handler = initHandler(typeAPI, schemaAPI, ruleAPI);

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
server.start(3002);

