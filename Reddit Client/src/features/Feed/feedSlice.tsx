import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockFeeds } from '../../utils/mockData';

export interface Post {
    id: string;
    title: string;
    author: string;
    score: number;
    num_comments: number;
    subreddit: string;
    url: string;
    thumbnail: string;
}

/* ## API Status: Mock Data
export const fetchPostsBySubreddit = createAsyncThunk(
    'feed/fetchPostsBySubreddit',
    async (name: string) => {
        const response = await fetch(`/api/r/${name}.json`);
        const data = await response.json();
        return data.data.children.map((child: any) => ({
            id: child.data.id,
            title: child.data.title,
            author: child.data.author,
            score: child.data.score,
            num_comments: child.data.num_comments,
            subreddit: child.data.subreddit,
            url: child.data.url,
            thumbnail: child.data.thumbnail || null
        }))
    }
)
*/


export const fetchPostsBySubreddit = createAsyncThunk(
    'feed/fetchPostsBySubreddit',
    async (name: string) => {
        return mockFeeds[name] ?? mockFeeds.popular;
    }
);


const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [] as Post[],
        status: 'idle',
        selectedSubreddit: 'popular',
        isRendered: false,
        isError: false
    },
    reducers: {
        selectSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsBySubreddit.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
                state.posts = action.payload
                state.status = 'succeeded'
                state.isRendered = true
            })
            .addCase(fetchPostsBySubreddit.rejected, (state) => {
                state.status = 'failed'
                state.isError = true
            })
    }
})

export const postSelector = (state: RootState) => state.feed.posts
export const selectedSubredditSelector = (state: RootState) => state.feed.selectedSubreddit;
export const statusSelector = (state: RootState) => state.feed.status;

export const { selectSubreddit } = feedSlice.actions;
export default feedSlice.reducer;