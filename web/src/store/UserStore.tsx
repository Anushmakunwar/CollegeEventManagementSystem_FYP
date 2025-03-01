import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  password: string;
  images?: string;
  roles?: string[];
  schoolSuffix?: string | null;
};

type UserStateType = {
  user: User | null;
  isLoggedIn: boolean;
  roles: string[];
  schoolSuffix: string | null;
};

type UserActionType = {
  setIsLoggedIn: (payload: { user: User }) => void;
  setLogOut: () => void;
};

type UserStoreType = UserStateType & UserActionType;

const initialUserState: UserStateType = {
  user: null,
  isLoggedIn: false,
  roles: [],
  schoolSuffix: null,
};

console.log(initialUserState, "initialUserState");

export const UserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      ...initialUserState,

      setIsLoggedIn: (payload) =>
        set((state) => ({
          ...state,
          isLoggedIn: true,
          user: payload.user,
          roles: payload.user?.roles || [],
          schoolSuffix: payload?.user?.schoolSuffix,
        })),

      setLogOut: () => set(initialUserState), // Reset to initial state on logout
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      getStorage: () => sessionStorage, // Storage mechanism
    },
  ),
);
