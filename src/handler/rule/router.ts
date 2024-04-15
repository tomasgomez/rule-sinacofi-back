import express from 'express';
import { IRuleAPI } from './interface';

// Init router 
export const initRuleRouter = (calls: IRuleAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.post('/validate', calls.VALIDATE_RULE);

    return router;
}
