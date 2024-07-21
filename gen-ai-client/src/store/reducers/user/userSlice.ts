import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../createAppSlice";

export type UserStateType = {
    uname: string;
    email: string;
    role: string;
    isAzureAuth: boolean;
};

const initialState: UserStateType = {
    uname: "",
    email: "",
    role: "",
    isAzureAuth: false,
};

const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: (create) => ({
        setUser: create.reducer(
            (state, action: PayloadAction<UserStateType>) => {
                state = {
                    ...state,
                    ...action.payload,
                };
                return state;
            }
        ),
    }),
    // selectors: {
    //     getUser: (state) => state,
    // },
});

export const { setUser } = userSlice.actions;
// export const { getUser } = userSlice.selectors;
export default userSlice;
