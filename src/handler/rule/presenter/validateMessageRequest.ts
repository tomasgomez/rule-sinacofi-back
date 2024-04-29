import express from "express";
import { IMessage, IMessageParams } from "../../../entities/message/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";


const validateMessageRequest  = (req: express.Request): IMessage | InternalError => {
    try {
      // Ensure required properties exist in req.body
      const { messageCode, parameters } = req.body;

      if (!messageCode) {
        throw new InternalError('Missing messageCode', ErrorCode.BAD_REQUEST, null, 400);
      }

      if (!parameters || parameters.length === 0) {
        throw new InternalError('Missing parameters', ErrorCode.BAD_REQUEST, null, 400);
      }

      const paramtersAdapted: IMessageParams[] = parameters.map((param: any) => {
        const { name, value } = param;
        if (!name || !value) {
          throw new InternalError('Missing parameter name or value', ErrorCode.BAD_REQUEST, null, 400);
        }
        return { name, value };
      });

      return { messageCode, parameters: paramtersAdapted };

    } catch (error) {
      console.error('Error creating Message from request:', error);
      return new InternalError('Error creating Message from request', ErrorCode.INTERNAL_SERVER_ERROR, null ,500);
    }
    
}

export { validateMessageRequest };