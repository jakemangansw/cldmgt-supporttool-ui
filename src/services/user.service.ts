import axios from "axios";
import { UserRoleResponse } from "../models/response/UserRoleResponse";
import { SupportUser } from "../models/dbo/UserDetailsDbo";

export const getUserRole = async (): Promise<UserRoleResponse> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/users/role";

    let res = await axios.get<UserRoleResponse>(url, {
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
    return res.data;
}

export const postNewUser = async (): Promise<boolean> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/onboarding/onboard";

    let res = await axios.post(url, {}, {
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
    return res.data;
}

export const getAllSupportUsers = async (): Promise<SupportUser[]> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/users/support-users";

    let res = await axios.get(url, {
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
    return res.data;
}