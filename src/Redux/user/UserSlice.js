import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId:"",
        username: "",
        email:"",
        image: "",
        picture:""
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.email = action.payload.email
            state.image = action.payload.image
        }


    }
})

export const { changeUserDetails } = UserSlice.actions
export default UserSlice.reducer