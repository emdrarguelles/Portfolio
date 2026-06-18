import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../Feed/feedSlice';

export interface Comment {
    id: string;
    author: string;
    author_icon: string | null;
    body: string;
    score: number;
    replies: Comment[];
}

export const fetchPostsById = createAsyncThunk(
    'postdetails/fetchPostsById',
    async () => {
        return [
            {
                id: '123',
                author: 'post.author',
                author_icon: 'post.author_icon',
                body: 'post.body',
                score: 0,
                replies: []
            },
            {
                id: '456',
                author: 'post.author',
                author_icon: 'post.author_icon',
                body: 'post.body',
                score: 0,
                replies: []
            },
            {
                id: '789',
                author: 'post.author',
                author_icon: 'post.author_icon',
                body: 'post.body',
                score: 0,
                replies: []
            }
        ]
    }
)

const postDetailsSlice = createSlice({
    name: 'postdetails',
    initialState: {
        post: null as Post | null,
        comments: [] as Comment[],
        status: 'idle',
        isRendered: false,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPostsById.fulfilled, (state, action) => {
                state.comments = action.payload
                state.status = 'succeeded'
                state.isRendered = true
            })
            .addCase(fetchPostsById.rejected, (state) => {
                state.status = 'failed'
                state.isError = true
            })
    }
})

export const postSelector = (state: RootState) => state.postdetails.post;
export const commentsSelector = (state: RootState) => state.postdetails.comments;

export default postDetailsSlice.reducer;
