import express from 'express';
import { IRuleAPI } from './interface';

// Init router 
export const initRuleRouter = (calls: IRuleAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.post('/validate/rule', calls.VALIDATE_RULE);
    router.post('/validate/message', calls.VALIDATE_MESSAGE);

    return router;
}
