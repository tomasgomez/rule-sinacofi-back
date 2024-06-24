import { InternalError } from "../../entities/internalError/error";
import { Message } from "../../entities/message/interface";
import { Rule } from "../../entities/rule/interface";
import { InputValue } from "../../entities/rule/ruleValidation";
import { IRuleRepository } from "../../repository/rule/interface";
import { ISchemaUsecase } from "../schema/usecase";
import { User } from "../../entities/user/interface";

/**  
* Rule interface
*/
export interface IRuleUsecase {
   repository: IRuleRepository;
   schemaUsecase: ISchemaUsecase;

   validateRule(rule: Rule, inputValue: InputValue): Promise<boolean | InternalError>;
   validateMessage(message: Message, user: User): Promise<Message | InternalError>;
}
