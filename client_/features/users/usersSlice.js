import { createSlice } from '@reduxjs/toolkit';
import nodes from '../../utils/sampleData';

export const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [] },
    reducers: {
        addUser: (state, action) => {
            const user = {
                ydfID: action.payload.ydfID,
                Name: action.payload.name,
                gender: action.payload.gender,
            };

            state.users.push(user);
        },

        updateUser: (state, action) => {
            state.users = state.users.map(user =>{
                if(user.id === action.payload.id){
                    return action.payload
                }

                return user;
            })
        },

        updateUserList: (state, action) => {
            state.users = action.payload
        },
    }
});

// this is for dispatch
export const { addUser, updateUser, updateUserList } = usersSlice.actions;

// this is for configureStore
export default usersSlice.reducer;