import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockSubreddits } from '../../utils/mockData';

interface Subreddit {
    name: string;
    icon: string | null;
}

/* ## API Status: Mock Data
export const fetchPopularSubreddits = createAsyncThunk(
    'popular/fetchPopularSubreddits',
    async () => {
        const response = await fetch('/api/r/popular.json?limit=5');
        const data = await response.json();
        return data.data.children.map((child: any) => ({
            name: child.data.display_name,
            icon: child.data.community_icon || child.data.icon_img || null,
        }))
    }
)
*/

export const fetchPopularSubreddits = createAsyncThunk(
    'popular/fetchPopularSubreddits',
    async () => {
        return mockSubreddits;
    }
);


export const popularSlice = createSlice({
    name: 'popular',
    initialState: {
        subreddits: [] as Subreddit[],
        status: 'idle',
        isRendered: false,
        isError: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularSubreddits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPopularSubreddits.fulfilled, (state, action) => {
                state.subreddits = action.payload;
                state.status = 'succeeded'
                state.isRendered = true;
            })
            .addCase(fetchPopularSubreddits.rejected, (state) => {
                state.status = 'failed';
                state.isError = true;
            })
    }
})

export const subredditsSelector = (state: RootState) => state.popular.subreddits;


export default popularSlice.reducer