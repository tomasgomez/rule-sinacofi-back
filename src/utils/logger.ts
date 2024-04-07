import winston from 'winston';
import express from 'express';

const { combine, timestamp, json } = winston.format;

// Create a Winston logger instance
export const winstonLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
            filename: process.env.LOG_FILENAME || '/var/log/rules-sinacofi-back.log',
            maxsize: 5242880
        }),
    ],
});

// Define a function to format log data
const formatLogData = (message: string, data?: any, ip?: string) => {
    const payload: any = {
        message,
        _ip_usuario: ip,
    };

    if (data instanceof Error) {
        payload.errorMessage = data.message;
    } else if (typeof data === 'object') {
        Object.assign(payload, data);
    } else {
        payload.detalle = data;
    }

    return payload;
};

// Define a custom middleware to log requests
export const logRequest: express.Handler = (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logData = formatLogData('Request', undefined, ip as string);
    winstonLogger.info('Request', logData);
    next();
};

// Define a custom error handler middleware to log errors
export const logResponse: express.Handler = (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logData = formatLogData('Error', res.json, ip as string);
    winstonLogger.error('Error', logData);
    next();
};
