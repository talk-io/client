export type User = {
    id: string,
    email: string,
    username: string,
    discriminator: string,
    password: string,
}

export type LoginResponse = User & {token: string}