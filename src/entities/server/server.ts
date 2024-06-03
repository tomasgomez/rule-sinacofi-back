import bodyParser from 'body-parser';
import express from 'express';
import Server from './interface';

/*
    Server class is responsible for setting up the express server and starting it.
    @param port: number - port number to listen to
    @param router: express.Router - router object to use
*/

export class App implements Server {
    private _server: express.Application;
    constructor(){
        this._server = express();
        this._server.use(bodyParser.urlencoded({ extended: true }));
    }
    // Set Routes
    setRoutes(router: express.Router) {
        this._server.use(router);
    }

    // Set Logger
    setLogger(loggerMiddleware: express.RequestHandler) {
        this._server.use(loggerMiddleware);
    }

    // Start the server
    start(port: number) {
        this._server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

