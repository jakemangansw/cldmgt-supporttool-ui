import { create } from "zustand";

const useActivePokerGameStore = create<any>((set: any) => ({
    activePokerGame: false,
    setActivePokerGame: () => set({ activePokerGame: true })
}))

export default useActivePokerGameStore;