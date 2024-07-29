import React from 'react'
import logo from '../../images/writer.png'
import { MenuDown, PersonFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useAuth } from '../../context/AuthContext'

const NavBar = () => {
    const history = useHistory();
    const { currentUser, Logout } = useAuth();

    return (
        <div style={{ width: '100vw' }}>
            <nav className="navbar navbar-expand-md sticky-top navbar-light bg-light" style={{ height: '70px' }}>
                <div className="container-fluid">
                    <Link to="/" className="p-2 align-items-center">
                        <img src={logo} alt="Logo" width="70" height="50" />
                    </Link>
                    <Link to="/" className='navbar-brand d-flex align-items-center'
                        style={{ fontFamily: 'Dancing Script', fontSize: '40px' }}
                    >
                        Blogger's Zone
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navBarNav"
                        aria-controls="navBarNav"
                        aria-expanded="false"
                        aria-label='Toggle navigation'
                    >
                        <span>
                            <MenuDown />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse bg-light" id="navBarNav">
                        <ul className='navbar-nav ml-auto justify-content-start' style={{ fontSize: "16px" }}>
                            <li className='navbar-brand'>
                                <Link to="/" className='nav-link'>
                                    Home
                                </Link>
                            </li>
                            <li className='navbar-brand'>
                                <Link to="/blogs" className='nav-link'>
                                    Blogs
                                </Link>
                            </li>
                            <li className='navbar-brand'>
                                <Link to="/quotes" className='nav-link'>
                                    Quotes
                                </Link>
                            </li>
                            <li className='navbar-brand'>
                                <Link to="/about" className='nav-link'>
                                    About
                                </Link>
                            </li>
                            <li className='navbar-brand'>
                                <Link to="/contact" className='nav-link'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse bg-light" id="navBarNav" >

                        <ul className="navbar-nav ml-auto" style={{ fontSize: '16px' }}>
                            {currentUser && currentUser.username ? (
                                <>

                                    <li className='navbar-brand'>
                                        <button
                                            onClick={() => history.push("/profile")}
                                            className="btn btn-light">
                                            <PersonFill fontSize="25" className='mr-2' />
                                            {currentUser.username}
                                        </button>
                                    </li>

                                    <li className='navbar-brand'>
                                        <button onClick={() => {
                                            Logout();
                                            history.push("/login");
                                        }} className="btn btn-light">
                                            Log out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className='navbar-brand'>
                                    <button onClick={() => {
                                        history.push("/login");
                                    }} className="btn btn-light">
                                        Log in
                                    </button>
                                </li>
                            )}

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar