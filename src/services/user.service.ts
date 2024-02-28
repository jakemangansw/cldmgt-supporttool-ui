import axios from "axios";
import { UserRoleResponse } from "../models/response/UserRoleResponse";

export const getUserRole = async (): Promise<UserRoleResponse> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/user/role";

    let res = await axios.get<UserRoleResponse>(url, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    return res.data;
}

export const postNewUser = async (): Promise<boolean> => {
    let token = localStorage.getItem("accessToken");
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/onboarding/onboard";

    let res = await axios.post(url, {}, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    return res.data;
}