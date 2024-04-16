
interface IMessageUsecase {
    createMessage(message: string): void;
    updateMessage(message: string): void;
    deleteMessage(message: string): void;
}

export { IMessageUsecase };