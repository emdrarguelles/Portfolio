import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
    id: string;
    title: string;
    author: string;
    score: number;
    num_comments: number;
    subreddit: string;
    url: string;
    thumbnail: string;
}

export const fetchPostsBySubreddit = createAsyncThunk(
    'feed/fetchPostsBySubreddit',
    async () => {
        return [
            {
                id: '123',
                title: 'postTitle',
                author: 'username',
                score: 0,
                num_comments: 0,
                subreddit: 'fromWhere',
                url: 'link',
                thumbnail: 'https://...'
            },
            {
                id: '456',
                title: 'postTitle',
                author: 'username',
                score: 0,
                num_comments: 0,
                subreddit: 'fromWhere',
                url: 'link',
                thumbnail: 'https://...'
            },
            {
                id: '789',
                title: 'postTitle',
                author: 'username',
                score: 0,
                num_comments: 0,
                subreddit: 'fromWhere',
                url: 'link',
                thumbnail: 'https://...'
            }
        ]
    }
)

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [] as Post[],
        status: 'idle',
        selectedSubreddit: 'popular',
        isRendered: false,
        isError: false
    },
    reducers: {},
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

export default feedSlice.reducer;