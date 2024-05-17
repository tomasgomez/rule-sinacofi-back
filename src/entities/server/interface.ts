import express from "express"

/*
    Server interface
*/

export default interface Server {
    setRoutes(router: express.Router): void,
    setLogger(loggerMiddleware: express.RequestHandler): void,
    start(port: number): void
}