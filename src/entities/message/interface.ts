
interface IMessage {
    messageCode: string;
    parameters: IMessageParams[];

}

interface IMessageParams {
    name: string;
    value: string;
}

export { IMessage, IMessageParams };