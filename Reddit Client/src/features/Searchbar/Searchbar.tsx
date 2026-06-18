import { search, searchTermSelector } from './searchbarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Searchbar = () => {
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector(searchTermSelector);

    return (
        <div className="searchbar-container">
            <input className="searchbar-input" type='text' value={searchTerm} onChange={(e) => dispatch(search(e.target.value))} placeholder='Search...' />
        </div>
    )
}

export default Searchbar;