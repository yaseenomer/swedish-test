import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Task, User } from "../../utils/model.utli";

export interface UserState {
    users: User[];
    loading: boolean;
}

const initialState: UserState = {
    users: [] as User[],
    loading: false,
} as const;

export const userSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setUsers: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.users>
        ) => {
            state.users = action.payload;
        },

        addUser: (
            state: Draft<typeof initialState>,
            action: PayloadAction<User>
        ) => {
            state.users = [...state.users, action.payload];
        },

        updateUser: (
            state: Draft<typeof initialState>,
            action: PayloadAction<User>
        ) => {
            state.users = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload;
                }
                return user;
            });
        },

        deleteUser: (
            state: Draft<typeof initialState>,
            action: PayloadAction<number>
        ) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        setUserLoading: (state: Draft<typeof initialState>, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
});

export const { setUsers, addUser, updateUser, deleteUser, setUserLoading } = userSlice.actions;


export default userSlice.reducer;
