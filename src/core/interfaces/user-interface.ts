export interface User {
    userInformation: UserInformationInterface;
    rememberMe: boolean;
    isLogged: boolean;
}

export interface UserInformationInterface {
    id: number | undefined;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
}