import express from 'express';
import { RuleAPI } from './interface';

// Init router 
export const initRuleRouter = (calls: RuleAPI): express.Router => {
    const router = express.Router();
    // Define the routes
    router.post('/validate/rule', calls.VALIDATE_RULE);
    router.post('/validate/message', calls.VALIDATE_MESSAGE);

    return router;
}
