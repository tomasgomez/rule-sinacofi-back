import express from "express"

/*
    Server interface
*/

export default interface IServer {
    setRoutes(router: express.Router): void,
    setLogger(loggerMiddleware: express.RequestHandler): void,
    start(port: number): void
}