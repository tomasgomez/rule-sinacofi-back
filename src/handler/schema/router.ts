import express from 'express';
import { ISchemaAPI } from './interface';

// Init router 
export const initSchemaRouter = (calls: ISchemaAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.get('/', calls.GET);

    return router;
}
