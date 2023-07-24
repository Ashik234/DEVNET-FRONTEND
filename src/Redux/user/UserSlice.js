import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId:"",
        username: "",
        email:"",
        joinedDate:"",
        status:""
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.email = action.payload.email
            state.joinedDate = action.payload.joinedDate
            state.status = action.payload.status
        }
    }
})

export const { changeUserDetails } = UserSlice.actions
export default UserSlice.reducer