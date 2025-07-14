import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { decryptData, encryptData } from "./secure";

const appStore = (set, get) => ({
    loginState: false,
    loginData: {
        email: ""
    },
    bookMarkData: [
        {
            title: "",
            description: "",
            link: "",
            created_at: null,
            isPinned: false
        }
    ],

    login: (auth) => {
        set((state) => ({
            loginData: auth,
            loginState: true
        }));
    },
    logout: (auth) => {
        set((state) => ({
            loginData: null,
            loginState: false
        }));
    },

    addBookMark: (data) => {
        set((state) => ({
            bookMarkData: [...state.bookMarkData, data],
        }));
    }
});

// const useAppStore = create(appStore);
const useAppStore = create(
    persist(appStore, {
        name: "app-data",
        storage: createJSONStorage(() => sessionStorage),
        // storage: {
        //     getItem: (key) => {
        //         const data = sessionStorage.getItem(key);
        //         return data ? decryptData(data) : null;
        //     },
        //     setItem: (key, value) => {
        //         sessionStorage.setItem(key, encryptData(value));
        //     },
        //     // removeItem: (name) => {
        //     //     sessionStorage.removeItem(name);
        //     // },

        // }
    }),
);


export default useAppStore;