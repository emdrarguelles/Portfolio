import Searchbar from '../../features/Searchbar/Searchbar';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-title">reddit<span style={{color: '#1C1C1C'}}>client</span></div>
            <Searchbar />
        </nav>
    )
}

export default Navbar;