import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../features/users/usersSlice';

export default configureStore({
    reducer: {
        users: usersSlice
    },
});