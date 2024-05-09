import express from 'express';
import { TypeAPI } from './interface';

// Init router 
export const initTypeRouter = (calls: TypeAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.get('/', calls.GET);

    return router;
}
