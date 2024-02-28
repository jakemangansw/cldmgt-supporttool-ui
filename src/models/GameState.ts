import { User } from "./User";

export interface RoomState {
    decidedValue: number;
    invalidValue: boolean;
    gameComplete: boolean;
    users: User[]
}