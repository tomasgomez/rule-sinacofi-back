import express from "express";
import { ICalls } from "../../entities/calls/interface";

// Define the Rule API interface

interface IRuleAPI extends ICalls {
    VALIDATE_RULE(req: express.Request, res: express.Response): Promise<void>
}

export { IRuleAPI };