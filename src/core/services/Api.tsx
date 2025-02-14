import {UserLogin} from "../userSlicer.ts";

export const getUserToken = async (userLogin: UserLogin) => {
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
            throw new Error()
        }

        return data.json();
    }
    catch (error: any) {
        throw new Error(error)
    }
}
export const getUserInfos = async (userToken: string) => {
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
            throw new Error()
        }

        return data.json();
    }
    catch (error: any) {
        throw new Error(error)
    }
}