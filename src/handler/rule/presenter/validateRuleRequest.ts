import express from "express";
import { IRule } from "../../../entities/rule/interface";
import { Rule } from "../../../entities/rule/rule";
import { ErrorCode, InternalError } from "../../../entities/internalError";

const createRuleFromRequest = (req: express.Request): IRule | InternalError => {
    try {
      // Ensure required properties exist in req.body
      const { id, name, description, fieldName, condition, value, schemaId, priority } = req.body;
  
      if (!id || !name || !fieldName || !condition || !value || !schemaId || !priority) {
        throw new InternalError('Missing required properties in request body', ErrorCode.BAD_REQUEST, null,400);
      }
    
      // Create the Rule object
      return new Rule(id, name, description, fieldName, condition, value, schemaId, priority);
    } catch (error) {
      console.error('Error creating Rule from request:', error);
      return new InternalError('Error creating Rule from request', ErrorCode.INTERNAL_SERVER_ERROR, null ,500);
    }
}

export { createRuleFromRequest };