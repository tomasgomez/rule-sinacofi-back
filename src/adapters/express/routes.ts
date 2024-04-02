import express from 'express';
import { getMessageHandler } from './handler/message';

const router = express.Router();

// Route for fetching a message
router.get('/message/:id', getMessageHandler);

export default router;
