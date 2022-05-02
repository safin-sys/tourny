import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => state = action.payload
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer