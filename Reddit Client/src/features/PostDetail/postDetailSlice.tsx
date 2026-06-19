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
    async (id: string) => {
        const response = await fetch(`/api/comments/${id}.json`);
        const data = await response.json();

        // data[0] = post listing, data[1] = comments listing
        const postData = data[0].data.children[0].data;
        const post: Post = {
            id: postData.id,
            title: postData.title,
            author: postData.author,
            score: postData.score,
            num_comments: postData.num_comments,
            subreddit: postData.subreddit,
            url: postData.url,
            thumbnail: postData.thumbnail || null
        };

        const mapComment = (child: any): Comment => {
            const c = child.data;
            const hasReplies = c.replies && c.replies.data;
            const replies = hasReplies
                ? c.replies.data.children
                    .filter((reply: any) => reply.kind === 't1')
                    .map(mapComment)
                : [];

            return {
                id: c.id,
                author: c.author,
                author_icon: c.author_icon || null,
                body: c.body,
                score: c.score,
                replies
            };
        };

        const comments = data[1].data.children
            .filter((child: any) => child.kind === 't1')
            .map(mapComment);

        return { post, comments };
    }
)

/* mocked data we used to build the app
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
*/

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
                state.post = action.payload.post
                state.comments = action.payload.comments
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
