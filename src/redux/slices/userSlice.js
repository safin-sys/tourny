import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => state = action.payload,
        clearUser: (state) => state = null,
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer