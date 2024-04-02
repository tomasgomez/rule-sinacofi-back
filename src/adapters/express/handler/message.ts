import { Request, Response } from 'express';

// Controller handler for fetching a message
export const getMessageHandler = (req: Request, res: Response) => {
    // TODO: Call use case to fetch a message

    let message = {}
    
    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }

    return res.json(message);
};
