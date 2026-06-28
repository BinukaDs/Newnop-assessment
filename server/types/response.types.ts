export interface IResponse {
    statusCode: number;
    message: string;
}

export interface IJWTResponseUser {
    userId: string;
    userRole: string;
    iat: number;
}
