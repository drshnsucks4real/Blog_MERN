import React from 'react'
import logo from '../../images/writer.png'
import { MenuDown, PersonFill } from 'react-bootstrap-icons'

const NavBar = () => {
    return (
        <div style={{ width: '100vw' }}>
            <nav className="navbar navbar-expand-md sticky-top navbar-light bg-light" style={{ height: '70px' }}>
                <div className="container-fluid">
                    <span className="p-2 align-items-center">
                        <img src={logo} alt="Logo" width="70" height="50" />
                    </span>
                    <span className='navbar-brand d-flex align-items-center'
                        style={{ fontFamily: 'Dancing Script', fontSize: '40px' }}
                    >
                        Blogger's Zone
                    </span>
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
                                <span className='nav-link'>
                                    Home
                                </span>
                            </li>
                            <li className='navbar-brand'>
                                <span className='nav-link'>
                                    Blogs
                                </span>
                            </li>
                            <li className='navbar-brand'>
                                <span className='nav-link'>
                                    About
                                </span>
                            </li>
                            <li className='navbar-brand'>
                                <span className='nav-link'>
                                    Contact
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse bg-light" id="navBarNav" >

                        <ul className="navbar-nav ml-auto" style={{ fontSize: '16px' }}>
                            <li className='navbar-brand'>
                                <button className="btn btn-light">
                                    <PersonFill fontSize="25" className='mr-2' />
                                    My Profile
                                </button>
                            </li>

                            <li className='navbar-brand'>
                                <button className="btn btn-light">
                                    Sign in
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar