import {UserLogin} from "../interfaces/user-login-interface.ts";
import {EditUserInformations} from "../interfaces/user-edit-interface.ts";

export const fetchTokenUser = async (userLogin: UserLogin) => {
    try {
        const data = await Promise.resolve(
            fetch('http://localhost:3001/api/v1/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(userLogin)
            })
        )
        const status = data.status;
        if (status !== 200) {
            return;
        }

        return data.json();
    }
    catch (error: any) {
        throw new Error(error)
    }
}

export const fetchUserInfos = async (userToken: string) => {
    try {
        const data = await Promise.resolve(
        fetch('http://localhost:3001/api/v1/user/profile', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${userToken}`
            }
        })
        )

        const status = data.status;
        if (status !== 200) {
            return;
        }

        return data.json();
    }
    catch (error: any) {
        throw new Error(error)
    }
}

export const updateUserInfos = async (query: EditUserInformations) => {
    try {
        const body = {
            firstName: query.firstName,
            lastName: query.lastName,
        }
        const data = await Promise.resolve(
        fetch('http://localhost:3001/api/v1/user/profile', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${query.userToken}`
            },
            body: JSON.stringify(body)
        })
        )

        const status = data.status;
        if (status !== 200) {
            return;
        }

        return data.json();
    }
    catch (error: any) {
        throw new Error(error)
    }
}