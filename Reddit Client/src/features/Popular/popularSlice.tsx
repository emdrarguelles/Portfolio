import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Subreddit {
    name: string;
    icon: string | null;
}

/* will use later once we do OAuth
export const fetchPopularSubreddits = createAsyncThunk(
    'popular/fetchPopularSubreddits',
    async () => {
        const response = await fetch('/api/subreddits/popular.json?limit=5');
        const data = await response.json();
        return data.data.children.map((child: any) => ({
            name: child.data.display_name,
            icon: child.data.community_icon || child.data.icon_img || null,
        }))
    }
)*/

export const fetchPopularSubreddits = createAsyncThunk(
    'popular/fetchPopularSubreddits',
    async () => {
        return [
            { name: 'gaming', icon: null },
            { name: 'worldnews', icon: null },
            { name: 'movies', icon: null },
            { name: 'music', icon: null },
            { name: 'technology', icon: null },
        ]
    }
)

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
export const statusSelector = (state: RootState) => state.popular.status;


export default popularSlice.reducer