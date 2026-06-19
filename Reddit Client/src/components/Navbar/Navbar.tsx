import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { selectSubreddit, fetchPostsBySubreddit } from '../../features/Feed/feedSlice';
import { clearPost } from '../../features/Searchbar/searchbarSlice';
import Searchbar from '../../features/Searchbar/Searchbar';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(selectSubreddit('popular'));
        dispatch(fetchPostsBySubreddit('popular'));
        dispatch(clearPost());
        navigate('/');
    };


    return (
        <nav className="navbar">
            <div className="navbar-title" onClick={handleClick}>reddit<span className="navbar-title-alt">client</span></div>
            <Searchbar />
        </nav>
    )
}

export default Navbar;