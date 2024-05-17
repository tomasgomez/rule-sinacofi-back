import { DefaultCalls } from "./interface";
import express from 'express';

/* 
    Handler class is responsible for handling the requests and responses.
*/

export abstract class Calls implements DefaultCalls {
    // Get
    async GET(req: express.Request, res: express.Response){
        res.status(405).end(`Method GET Not implemented`);
    };
    // Post
    async POST(req: express.Request, res: express.Response){
        res.status(405).end(`Method POST Not implemented`);
    };
    // Put 
    async PUT(req: express.Request, res: express.Response){
        res.status(405).end(`Method PUT Not implemented`);
    };
    // Delete 
    async DELETE(req: express.Request, res: express.Response){
        res.status(405).end(`Method DELETE Not implemented`);
    }
}