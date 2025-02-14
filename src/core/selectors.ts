import {StoreState} from "./store.ts";


export const isLogged = (state: StoreState) => state.user.logged;
export const userToken = (state: StoreState) => state.user.token;
export const userInfos = (state: StoreState) => state.user.userInformation;