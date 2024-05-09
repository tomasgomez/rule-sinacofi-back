import express from 'express';
import { SchemaAPI } from './interface';

// Init router 
export const initSchemaRouter = (calls: SchemaAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.get('/:messageCode', calls.GET_DEFAULT_SCHEMA);
    router.post('/:messageCode', calls.GET_SCHEMA);
    return router;
}
