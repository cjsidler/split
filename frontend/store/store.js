import create from "zustand";

const useStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (newStatus) => set((state) => ({ isLoggedIn: newStatus })),
}));

export default useStore;
