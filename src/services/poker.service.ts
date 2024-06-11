import axios from "axios";
import { BasicRoomInfo } from "../models/BasicRoomInfo";

export const getPokerRooms = async (): Promise<BasicRoomInfo[]> => {
    let url = import.meta.env.VITE_API_URL_HTTPS + "/api/poker/rooms";

    let res = await axios.get<BasicRoomInfo[]>(url);
    return res.data;
}