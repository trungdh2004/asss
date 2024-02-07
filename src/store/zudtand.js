import { create } from "zustand";

export const useProfile = create((set) => ({
    data:null,
    onLogin: (user) => set(() => ({data:user})),
    onLogOut:() => set(() => ({data:null}))
}))