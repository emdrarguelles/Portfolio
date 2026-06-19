import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../features/Feed/feedSlice';
import { mockFeeds } from '../../utils/mockData';

/* ## API Status: Mock Data
export const fetchPostsBySearch = createAsyncThunk(
    'searchbar/fetchPostsBySearch',
    async (search: string) => {
        const response = await fetch(`/api/search.json?q=${search}`);
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

export const fetchPostsBySearch = createAsyncThunk(
    'searchbar/fetchPostsBySearch',
    async (search: string) => {
        const term = search.toLowerCase();

        const allGlobalPosts = Object.values(mockFeeds).flat();

        return allGlobalPosts.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.subreddit.toLowerCase().includes(term) ||
            post.author.toLowerCase().includes(term)
        );
    }
);

const searchBarSlice = createSlice({
    name: 'searchbar',
    initialState: {
        searchTerm: '',
        status: 'idle',
        results: [] as Post[]
    },
    reducers: {
        search: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = '';
        },
        clearPost: (state) => {
            state.results = [] as Post[];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsBySearch.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.results = action.payload
            })
            .addCase(fetchPostsBySearch.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const searchTermSelector = (state: RootState) => state.searchbar.searchTerm;
export const resultsSelector = (state: RootState) => state.searchbar.results;

export default searchBarSlice.reducer;
export const { search, clearPost, clearSearch } = searchBarSlice.actions;