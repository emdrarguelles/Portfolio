import { useEffect } from 'react';
import { fetchPostsBySubreddit, postSelector, selectedSubredditSelector, statusSelector, } from './feedSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Posts from '../../components/Posts/Posts';
import { resultsSelector, clearPost } from '../../features/Searchbar/searchbarSlice';

const Feed = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelector);
    const selectedSubreddit = useAppSelector(selectedSubredditSelector);
    const status = useAppSelector(statusSelector);
    const searchResults = useAppSelector(resultsSelector);

    useEffect(() => {
        dispatch(fetchPostsBySubreddit(selectedSubreddit));
    },[selectedSubreddit, dispatch])

    return (
        <div className="feed">
            {searchResults.length > 0 && (
                <button className="back-btn" onClick={() => dispatch(clearPost())}>
                    ← Back to Feed
                </button>
            )}
            <Posts post={post} selectedSubreddit={selectedSubreddit} status={status} />
        </div>
    )
}

export default Feed;