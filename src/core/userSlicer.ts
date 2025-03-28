import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "./interfaces/user-interface.ts";
import {updateUserInfos, fetchTokenUser, fetchUserInfos} from "./services/Api.tsx";
import {UserLogin} from "./interfaces/user-login-interface.ts";
import {EditUserInformation} from "./interfaces/user-edit-interface.ts";

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
            const response: any = await fetchTokenUser(userLoginBody);

            if (response.status === 200) {
                if (userLoginBody.rememberMe) {
                    const rememberUser: string = userLoginBody.email;
                    localStorage.setItem('rememberUser', rememberUser);
                }
                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Unknown error");
        }
    }
)

export const getUserInfos = createAsyncThunk(
    "user/getUserInfos",
    async (userToken: string, {rejectWithValue})=> {
        try {
            const response: any = await fetchUserInfos(userToken);

            if (response.status === 200) {

                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Unknown error");
        }
    }
)

export const setUserInfos = createAsyncThunk(
    "user/setUserInfos",
    async (query: EditUserInformation, {rejectWithValue}) => {
        try {
            const response: any = await updateUserInfos(query);

            if (response.status === 200) {

                return response;
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "Unknown error");
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {

            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // GetTokenUser
            .addCase(getUserToken.pending, () => {})
            .addCase(getUserToken.fulfilled, (state, action) => {
                state.token = action.payload.body.token
            })
            .addCase(getUserToken.rejected, () => {})

            // GetInfosUser
            .addCase(getUserInfos.pending, () => {})
            .addCase(getUserInfos.fulfilled, (state, action) => {
                state.userInformation = {
                    email: action.payload.body.email,
                    firstName: action.payload.body.firstName,
                    lastName: action.payload.body.lastName,
                    id: action.payload.body.id,
                }
            })
            .addCase(getUserInfos.rejected, () => {})

            // SetInfosUser
            .addCase(setUserInfos.pending, () => {})

            .addCase(setUserInfos.fulfilled, (state, action) => {
                state.userInformation = {
                    ...state.userInformation,
                    firstName: action.payload.body.firstName,
                    lastName: action.payload.body.lastName,
                };
            })

            .addCase(setUserInfos.rejected, () => {})
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;