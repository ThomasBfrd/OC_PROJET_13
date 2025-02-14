export interface User {
    userInformation: UserInformationInterface;
    token: string | undefined;
}

export interface UserInformationInterface {
    id: number | undefined;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
}