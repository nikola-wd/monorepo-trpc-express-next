export const UserRoles = {
    owner: 'owner',
    client: 'client',
    employee: 'employee',
    superadmin: 'superadmin',
    // TODO: create one more for auth (unauthenticated)
    all: 'all', // this signifies no specific role requirement
};

export type TUserRole = keyof typeof UserRoles;

export type TSessionUser = {
    sub: string;
    name: string | null;
    email: string;
    roles: TUserRole[];
    image?: string;
};

export interface IJwtPayload {
    user: TSessionUser;
    maxSessionEndingTime?: number; // Unix timestamp in seconds
    // iat: number;
    // exp: number;
}

export type TRegisterAs = 'owner' | 'client';
export interface IRegisterUser {
    email: string;
    password: string;
    registerAs: TRegisterAs;
}

export interface IAccessToken {
    access_token: string;
}
