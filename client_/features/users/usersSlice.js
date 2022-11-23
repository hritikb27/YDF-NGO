import { createSlice } from '@reduxjs/toolkit';
import nodes from '../../utils/sampleData';

export const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [...nodes] },
    reducers: {
        addUser: (state, action) => {
            const user = {
                id: action.payload.studentID,
                name: action.payload.name,
                type: 'TASK',
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
        }
    }
});

// this is for dispatch
export const { addUser, updateUser } = usersSlice.actions;

// this is for configureStore
export default usersSlice.reducer;