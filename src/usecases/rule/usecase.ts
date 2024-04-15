/* 
    Rule interface
*/

export interface IRuleUsecase {
   validateRule(rule: any): Promise<boolean>;
}

