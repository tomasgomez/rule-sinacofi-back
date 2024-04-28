
import express from 'express';
import { Handler } from './handler';
import { initTypeRouter } from './type/router';
import { initSchemaRouter } from './schema/router';
import { initRuleRouter } from './rule/router';

// Init router 
export const initRouter = (handler: Handler): express.Router => {
    
    // create router
    const router = express.Router();

    // init type router
    const typeRouter = initTypeRouter(handler.typeCalls);
    router.use('/schemaTypes', typeRouter);

    // init schema router
    const schemaRouter = initSchemaRouter(handler.schemaCalls);
    router.use('/schema', schemaRouter);

    // init rule router
    const ruleRouter = initRuleRouter(handler.ruleCalls);
    router.use('/rule', ruleRouter);
    
    return router;
}
