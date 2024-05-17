import express from 'express';

/*
    API Calls interface
*/

interface DefaultCalls {
    GET(req: express.Request, res: express.Response): Promise<void>,
    POST(req: express.Request, res: express.Response): Promise<void>,
    PUT(req: express.Request, res: express.Response): Promise<void>
    DELETE(req: express.Request, res: express.Response): Promise<void>
}

export { DefaultCalls };