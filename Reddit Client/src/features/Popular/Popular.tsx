import { useEffect } from 'react';
import { fetchPopularSubreddits, subredditsSelector, statusSelector } from './popularSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Popular = () => {
    const dispatch = useAppDispatch();
    const subreddits = useAppSelector(subredditsSelector);
    const status = useAppSelector(statusSelector);

    useEffect(() => {
        dispatch(fetchPopularSubreddits())
    },[])
    return (
        <>
           {subreddits.map(subreddit => (
            <div key={subreddit.name} className="subreddit-item">
                <div className="subreddit-icon" />
                <span className="subreddit-name">{subreddit.name}</span>
            </div>
            ))}
        </>
    )
}

export default Popular;