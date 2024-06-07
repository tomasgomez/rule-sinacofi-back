import express from "express";
import { Message } from "../../../entities/message/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { MessageParameter } from "../../../entities/paremeters/interface";


const validateMessageRequest  = (req: express.Request): Message | InternalError => {
    try {
      // Ensure required properties exist in req.body
      const { messageCode, parameters } = req.body;

      if (!messageCode) {
        console.error('Missing messageCode');
        throw { message: 'Missing messageCode',statusCode: ErrorCode.BAD_REQUEST}
      }

      if (!parameters || parameters.length === 0) {
        console.error('Missing parameters');
        throw { message: 'Missing parameters', statusCode: ErrorCode.BAD_REQUEST}
      }

      const paramtersAdapted: MessageParameter[] = parameters.map((param: MessageParameter) => {
        const { name, value } = param;
        if (!name || !value) {
          console.error('Missing parameter name or value');
          throw { message: 'Missing parameter name or value', code: ErrorCode.BAD_REQUEST}
        }
        return { name, value };
      });
      return { messageCode, parameters: paramtersAdapted };

    } catch (error) {
      console.error('Error creating Message from request:', error);
      return { message: 'Error creating Message form request', code: ErrorCode.BAD_REQUEST};
    }
    
}

export { validateMessageRequest };