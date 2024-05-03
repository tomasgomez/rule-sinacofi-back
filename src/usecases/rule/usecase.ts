import { InternalError } from "../../entities/internalError/error";
import { IMessage } from "../../entities/message/interface";
import { IRule } from "../../entities/rule/interface";
import { InputValue } from "../../entities/rule/ruleValidation";
import { IRuleRepository } from "../../repository/rule/interface";
import { ISchemaUsecase } from "../schema/usecase";

/**  
* Rule interface
*/
export interface IRuleUsecase {
   repository: IRuleRepository;
   schemaUsecase: ISchemaUsecase;

   validateRule(rule: IRule, inputValue: InputValue): Promise<boolean | InternalError>;
   validateMessage(message: IMessage): Promise<boolean | InternalError>;
}

