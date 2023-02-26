import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
    name: 'items',
    initialState: { items: {} },
    reducers: {
        addItem: (state, action) => {
            state.items[action.payload.type].push(action.payload.data)
        },

        updateItem: (state, action) => {
            state.items = state.items[action.payload.type].map(item =>{
                if(item.id === action.payload.id){
                    return action.payload.data
                }

                return item;
            })
        },

        updateItemsList: (state, action) => {
            state.items = action.payload
        },
    }
});

// this is for dispatch
export const { addItem, updateItem, updateItemsList } = itemsSlice.actions;

// this is for configureStore
export default itemsSlice.reducer;