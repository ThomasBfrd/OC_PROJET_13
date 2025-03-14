import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "./interfaces/user-interface.ts";
import {editUserInfos, getUserInfos, getUserToken} from "./services/Api.tsx";
import {UserLogin} from "./interfaces/user-login-interface.ts";

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

export const fetchTokenUser = createAsyncThunk(
    "user/fetchTokenUser",
    async (userLoginBody: UserLogin, {rejectWithValue})=> {
        try {
            console.log('LoginBody : ', userLoginBody);
            const response: any = await getUserToken(userLoginBody);

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

export const fetchInfosUser = createAsyncThunk(
    "user/fetchInfosUser",
    async (userToken: string, {rejectWithValue})=> {
        try {
            console.log('LoginBody : ', userToken);
            const response: any = await getUserInfos(userToken);

            if (response.status === 200) {
                console.log('Response userInfos : ', response);
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Erreur inconnue");
        }
    }
)

export interface EditUser {
    userToken: string,
    firstName: string,
    lastName: string
}

export const fetchEditUserInfos = createAsyncThunk(
    "user/fetchEditUserInfos",
    async (query: EditUser, {rejectWithValue}) => {
        try {
            console.log('LoginBody : ', query.userToken);
            const response: any = await editUserInfos(query);

            if (response.status === 200) {
                console.log('Response userInfos : ', response);
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
            .addCase(fetchTokenUser.pending, (_, action) => {
                console.log('Connexion en cours...', action.payload);
            })
            .addCase(fetchTokenUser.fulfilled, (state, action) => {
                console.log('Connexion réussie', action.payload);
                state.token = action.payload.body.token

                console.log('Contenu du state mis à jour : ', state.token)
            })
            .addCase(fetchTokenUser.rejected, (_, action) => {
                console.log("Une erreur est survenue... ", action.payload);
            })

            .addCase(fetchInfosUser.pending, (_, action) => {
                console.log('Récupération des infos en cours...', action.payload);
            })
            .addCase(fetchInfosUser.fulfilled, (state, action) => {
                console.log('Récupération des infos réussie', action.payload);
                state.userInformation = {
                    email: action.payload.body.email,
                    firstName: action.payload.body.firstName,
                    lastName: action.payload.body.lastName,
                    id: action.payload.body.id,
                }

                console.log('Contenu du state mis à jour pour userInfos: ', state.userInformation)
            })
            .addCase(fetchInfosUser.rejected, (_, action) => {
                console.log("Une erreur est survenue... ", action.payload);
            })
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;