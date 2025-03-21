import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "./interfaces/user-interface.ts";
import {updateUserInfos, fetchTokenUser, fetchUserInfos} from "./services/Api.tsx";
import {UserLogin} from "./interfaces/user-login-interface.ts";
import {EditUserInformations} from "./interfaces/user-edit-interface.ts";

const initialState: User = {
    userInformation: {
        id: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
    },
    token: undefined,
    rememberMe: false,
}

export const getUserToken = createAsyncThunk(
    "user/fetchTokenUser",
    async (userLoginBody: UserLogin, {rejectWithValue})=> {
        try {
            console.log('LoginBody : ', userLoginBody);
            const response: any = await fetchTokenUser(userLoginBody);

            if (response.status === 200) {
                console.log('Response UserToken : ', response);
                if (userLoginBody.rememberMe) {
                    const rememberUser: string = userLoginBody.email;
                    localStorage.setItem('rememberUser', rememberUser);
                }
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Erreur inconnue");
        }
    }
)

export const getUserInfos = createAsyncThunk(
    "user/getUserInfos",
    async (userToken: string, {rejectWithValue})=> {
        try {
            console.log('LoginBody : ', userToken);
            const response: any = await fetchUserInfos(userToken);

            if (response.status === 200) {
                console.log('Response userInfos : ', response);
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Erreur inconnue");
        }
    }
)

export const setUserInfos = createAsyncThunk(
    "user/setUserInfos",
    async (query: EditUserInformations, {rejectWithValue}) => {
        try {
            console.log('LoginBody : ', query.userToken);
            const response: any = await updateUserInfos(query);

            if (response.status === 200) {
                console.log('Response UserInfos : ', response);
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Erreur inconnue");
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            console.log('logout...')
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // GetTokenUser
            .addCase(getUserToken.pending, (_, action) => {
                console.log('Connexion en cours...', action.payload);
            })
            .addCase(getUserToken.fulfilled, (state, action) => {
                console.log('Connexion réussie', action.payload);
                state.token = action.payload.body.token

                console.log('Contenu du state mis à jour : ', state.token)
            })
            .addCase(getUserToken.rejected, (_, action) => {
                console.log("Une erreur est survenue... ", action);
            })

            // GetInfosUser
            .addCase(getUserInfos.pending, (_, action) => {
                console.log('Récupération des infos en cours...', action.payload);
            })
            .addCase(getUserInfos.fulfilled, (state, action) => {
                console.log('Récupération des infos réussie', action.payload);
                state.userInformation = {
                    email: action.payload.body.email,
                    firstName: action.payload.body.firstName,
                    lastName: action.payload.body.lastName,
                    id: action.payload.body.id,
                }

                console.log('Contenu du state mis à jour pour userInfos: ', state.userInformation)
            })
            .addCase(getUserInfos.rejected, (_, action) => {
                console.log("Une erreur est survenue... ", action.payload);
            })

            // SetInfosUser
            .addCase(setUserInfos.pending, (_, action) => {
                console.log("Attente d'update du profile :", action.payload);
            })

            .addCase(setUserInfos.fulfilled, (state, action) => {
                console.log('Update des infos user dans le slicer');
                state.userInformation = {
                    ...state.userInformation,
                    firstName: action.payload.body.firstName,
                    lastName: action.payload.body.lastName,
                };

                console.log('Contenu correctement mis à jour : ', state.userInformation);
            })

            .addCase(setUserInfos.rejected, (_, action) => {
                console.log("Une erreur est survenue... ", action.payload);
            })
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;