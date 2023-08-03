import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId:"",
        username: "",
        email:"",
        joinedDate:"",
        status:"",
        about:"",
        github:"",
        linkedin:"",
        image:""
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.email = action.payload.email
            state.joinedDate = action.payload.joinedDate
            state.status = action.payload.status
            state.about = action.payload.about
            state.github = action.payload.github
            state.linkedin = action.payload.linkedin
            state.image = action.payload.image
        }
    }
})

export const { changeUserDetails } = UserSlice.actions
export default UserSlice.reducer