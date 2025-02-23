import { ContractError } from "./contract-error";

export class InsufficientBalanceError extends ContractError {
    constructor(
        message: string,
        public address: string,
        public amount: string
    ) {
        super(message, 400, 'INSUFFICIENT_BALANCE');
        this.name = 'InsufficientBalanceError';
    }
}