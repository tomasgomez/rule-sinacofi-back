import { Request, Response } from "express";
import { SchemaAPI } from "../interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { fillSchemaRequest } from "../presenter/fillSchemaRequest";



const fillSchema = async (context: SchemaAPI, req: Request, res: Response): Promise<void> => {
    try{

        // adapt request
        const requestAdapted = fillSchemaRequest(req);
    }catch(error){
        /* Return the error */
        const e: InternalError = { message: "Error getting schema", statusCode: 500, code: ErrorCode.INTERNAL_SERVER_ERROR, data: null};
        res.status(500).json(e)
        return;
    }
}

export { fillSchema }