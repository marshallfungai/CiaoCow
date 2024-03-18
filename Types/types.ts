import { ReactNode } from "react";

type AuthProviderProps = {
    children: ReactNode;
    userCredentials: UserProps | null;
    login: (email: string, password: string) => void;
    register: (username: string, email: string, password: string) => void;
    logout: () => void;
}

type UserProps = {
    id: number | null;
    username?: string | null;
    email?: string | null;
    userToken?: string | null;

}

export {
    UserProps as UserProps,
    AuthProviderProps as AuthProviderProps,
}