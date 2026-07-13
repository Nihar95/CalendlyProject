export class ApiError extends Error{
    readonly statusCode: number;
    readonly details?: unknown

    constructor(statusCode: number, message: string, details?: unknown){
        super(message);
        this.statusCode= statusCode;
        this.details=details;
        this.name= "API Error";
        Error.captureStackTrace(this, this.constructor) // need to explore
    }

}


export function badRequest(message: string, details?: unknown) {
    return new ApiError(400, message, details);
}

export function unauthorized(message: string, details?: unknown) {
    return new ApiError(401, message, details);
}

export function forbidden(message: string, details?: unknown) {
    return new ApiError(403, message, details);
}

export function notFound(message: string, details?: unknown) {
    return new ApiError(404, message,details);
}

export function conflict(message: string, details?: unknown) {
    return new ApiError(409, message, details);
}

export function unprocessableEntity(message: string, details?: unknown) {
    return new ApiError(422, message, details);
}

export function tooManyRequests(message: string, details?: unknown) {
    return new ApiError(429, message, details);
}

export function internalServerError(message: string, details?: unknown) {
    return new ApiError(500, message, details);
}

export function notImplemented(message: string, details?: unknown) {
    return new ApiError(501, message, details);
}

export function serviceUnavailable(message: string, details?: unknown) {
    return new ApiError(503, message, details);
}