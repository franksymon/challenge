export enum GlobalEnumStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
}

export enum GlobalEnumMessage {
    OK = 'OK',
    CREATED = 'CREATED',
    NO_CONTENT = 'NO CONTENT',
    BAD_REQUEST = 'BAD REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT FOUND',
    CONFLICT = 'CONFLICT',
    TOO_MANY_REQUESTS = 'TOO MANY REQUESTS',
    INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR',
}

export enum GlobalEnumUserType {
    ADMIN = 'admin',
    USER = 'user',
}   

export enum GlobalEnumUserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum GlobalEnumNoteStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}