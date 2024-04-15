/* 
    TypeUsecase interface
*/

export interface ITypeUsecase {
    getMessageType(message: any): Promise<any | null>; 
}

