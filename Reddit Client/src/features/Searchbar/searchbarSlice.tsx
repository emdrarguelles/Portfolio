import { RootState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
    name: 'searchbar',
    initialState: {searchTerm: ''},
    reducers: {
        search: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
})

export const searchTermSelector = (state: RootState) => state.searchbar.searchTerm;

export default searchBarSlice.reducer;
export const { search } = searchBarSlice.actions;