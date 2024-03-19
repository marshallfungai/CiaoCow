import { ReactNode } from "react";

type TAuthProviderProps = {
    children: ReactNode;
    userCredentials: TUserProps | null;
    login: (email: string, password: string) => void;
    register: (username: string, email: string, password: string) => void;
    logout: () => void;
}

type TUserProps = {
    id: number | null;
    username?: string | null;
    email?: string | null;
    userToken?: string | null;

}

export {
    TUserProps as TUserProps,
    TAuthProviderProps as TAuthProviderProps,
}