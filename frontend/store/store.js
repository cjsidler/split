import create from "zustand";

const useStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (newStatus) => set((state) => ({ isLoggedIn: newStatus })),

    userName: "",
    setUserName: (name) => set((state) => ({ userName: name })),

    userEmail: "",
    setUserEmail: (email) => set((state) => ({ userEmail: email })),
}));

export default useStore;
