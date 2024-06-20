import express from "express";
import { Rule } from "../../../entities/rule/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";

const createRuleFromRequest = (req: express.Request): Rule | InternalError => {
    try {
      // Ensure required properties exist in req.body
      const { id, name, description, fieldName, condition, value, schemaId, priority, category } = req.body;

      if (!id || !name || !fieldName || !condition || !value || !schemaId || !priority) {
        throw { 
          message: 'Missing required properties in request body',
          code: ErrorCode.BAD_REQUEST,
          data: null,
          statusCode: 400
        };
      }
      // Create the Rule object
      return { id: id, name: name, description: description, type:fieldName, category: category,condition: condition, value: value, priority: priority, createdAt: new Date(), updatedAt: new Date() };
    } catch (error) {
      const e: InternalError = { message: 'Error creating Rule from request', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500};  
      console.error('Error creating Rule from request:', error);
      return e;
    }
}

export { createRuleFromRequest };