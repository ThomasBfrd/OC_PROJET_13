import {StoreState} from "./store.ts";



export const userToken = (state: StoreState) => state.user.token;
export const userInfos = (state: StoreState) => state.user.userInformation;