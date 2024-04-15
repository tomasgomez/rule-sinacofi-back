import express from 'express';
import { ITypeAPI } from './interface';

// Init router 
export const initTypeRouter = (calls: ITypeAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.get('/', calls.GET);

    return router;
}
