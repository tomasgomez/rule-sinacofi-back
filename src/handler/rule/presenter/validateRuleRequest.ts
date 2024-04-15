import express from "express";
import { IRule } from "../../../entities/rule/interface";
import { Rule } from "../../../entities/rule/rule";

const createRuleFromRequest = (req: express.Request): IRule | Error => {
    try {
      // Ensure required properties exist in req.body
      const { id, name, description, fieldName, condition, value, schemaId, priority } = req.body;
  
      if (!id || !name || !description || !fieldName || !condition || !value || !schemaId || !priority) {
        throw new Error('Missing required properties in request body');
      }
  
      // Optionally validate properties here (e.g., type checks)
  
      // Create the Rule object
      return new Rule(id, name, description, fieldName, condition, value, schemaId, priority);
    } catch (error) {
      console.error('Error creating Rule from request:', error);
      return new Error('Invalid id');
    }
}

export { createRuleFromRequest };