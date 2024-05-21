import axios from "axios";
import { UserRoleResponse } from "../models/response/UserRoleResponse";
import { SupportUser } from "../models/dbo/SupportUser";

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

export const postApproveUser = async (email: string): Promise<void> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/users/approve/" + email;

    let res = await axios.post(url, null, {
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
    return res.data;
}

export const putUpdateRole = async (params: { email: string, roleAsString: string }): Promise<void> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/users/" + params.email + "/role";

    let res = await axios.put(url, null, {
        params: {
            role: params.roleAsString
        },
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
    return res.data;
}