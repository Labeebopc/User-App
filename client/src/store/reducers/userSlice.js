import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer