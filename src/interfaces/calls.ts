import express from 'express';

/*
    API Calls interface
*/

export interface ICalls {
    GET(req: express.Request, res: express.Response): Promise<void>,
    POST(req: express.Request, res: express.Response): Promise<void>,
    PUT(req: express.Request, res: express.Response): Promise<void>
    DELETE(req: express.Request, res: express.Response): Promise<void>
}