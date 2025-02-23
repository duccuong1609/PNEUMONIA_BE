export class ContractError extends Error {
    constructor(
        message: string,
        public statusCode: number = 400,
        public errorCode: string = 'CONTRACT_ERROR'
    ) {
        super(message);
        this.name = 'ContractError';
    }
}