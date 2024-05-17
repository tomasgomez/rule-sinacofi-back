import express from "express";
import { DefaultCalls } from "../../entities/calls/interface";

// Define the Rule API interface

interface RuleAPI extends DefaultCalls {
    VALIDATE_RULE(req: express.Request, res: express.Response): Promise<void>
    VALIDATE_MESSAGE(req: express.Request, res: express.Response): Promise<void>
}

export { RuleAPI };