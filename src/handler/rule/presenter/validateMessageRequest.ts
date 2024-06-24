import express from "express";
import { Message } from "../../../entities/message/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { MessageParameter } from "../../../entities/paremeters/interface";
import { User } from "../../../entities/user/interface";


const validateMessageRequest  = (req: express.Request): [Message, User] | InternalError => {
    try {
      // Ensure required properties exist in req.body
      const { messageCode, origin, destination, status, parameters, user } = req.body;

      if (!messageCode) {
        console.error('Missing messageCode');
        throw { message: 'Missing messageCode',statusCode: ErrorCode.BAD_REQUEST}
      }

      if (!parameters || parameters.length === 0) {
        console.error('Missing parameters');
        throw { message: 'Missing parameters', statusCode: ErrorCode.BAD_REQUEST}
      }

      const paramtersAdapted: MessageParameter[] = parameters.map((param: MessageParameter) => {
        const { name, value, defaultValue } = param;
        if (!name || (!value && !defaultValue)) {
          console.error('Missing parameter name or value');
          // throw { message: 'Missing parameter name or value', code: ErrorCode.BAD_REQUEST}
        }
        return { name, value };
      });
      return [{ messageCode, origin, destination, parameters: paramtersAdapted, status }, user];

    } catch (error) {
      console.error('Error creating Message from request:', error);
      return { message: 'Error creating Message form request', code: ErrorCode.BAD_REQUEST};
    }
    
}

export { validateMessageRequest };