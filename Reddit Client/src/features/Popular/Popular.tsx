import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPopularSubreddits, subredditsSelector } from './popularSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSubreddit, fetchPostsBySubreddit } from '../Feed/feedSlice';

const Popular = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const subreddits = useAppSelector(subredditsSelector);

    useEffect(() => {
        dispatch(fetchPopularSubreddits())
    },[dispatch])

    
    const handleClick = (name: string) => {
        dispatch(selectSubreddit(name));
        dispatch(fetchPostsBySubreddit(name));
        navigate('/');                       
    };
    return (
        <>
        {subreddits.map((subreddit) => (
            <div 
                key={subreddit.name} 
                className="subreddit-item"
                onClick={() => handleClick(subreddit.name)}
            >
                {subreddit.icon && <img src={subreddit.icon} alt={subreddit.name} className="subreddit-icon" />}
                <span className="subreddit-name">{subreddit.name}</span>
            </div>
        ))}
    </>
    )
}

export default Popular;