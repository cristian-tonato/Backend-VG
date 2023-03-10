export interface CustomError extends Error {
    statusCode: number;
    statusMessage: string;
}

export class HTTPError extends Error implements CustomError {
    constructor(
        public statusCode: number,
        public statusMessage: string,
        public message: string,
        public option?: ErrorOptions
    ) {
        super(message, option);
        this.name = 'HTTPError';
    }
}
