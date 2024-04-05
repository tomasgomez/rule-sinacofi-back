
import express from 'express';
import { Handler } from './handler';

// Init router 
export const initRouter = (handler: Handler): express.Router => {
    const router = express.Router();

    // Define the routes
    router.get('/type', handler.typeCalls.GET);
    router.post('/type', handler.typeCalls.POST);
    router.put('/type', handler.typeCalls.PUT);
    router.delete('/type', handler.typeCalls.DELETE);

    router.get('/schema', handler.schemaCalls.GET);
    router.post('/schema', handler.schemaCalls.POST);
    router.put('/schema', handler.schemaCalls.PUT);
    router.delete('/schema', handler.schemaCalls.DELETE);

    return router;
}
