import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from '../features/users/itemsSlice';
import usersSlice from '../features/users/usersSlice';

export default configureStore({
    reducer: {
        users: usersSlice,
        items: itemsSlice
    },
});