import React, { useRef } from 'react'
import logo from '../../images/writer.png'
import './Login.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { Login, currentUser } = useAuth();
    const history = useHistory();

    if (currentUser) {
        history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Login(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-6 col-xl-5 mx-auto">
                    <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden no-hover">
                        <div className="card-body p-4 p-sm-5">
                            <div>
                                <p className="card-title text-center mb-5" style={{ fontFamily: 'Dancing Script', fontSize: '30px' }}>
                                    <span className="p-2">
                                        <img src={logo} alt="Logo" width="70" height="55" />
                                    </span>
                                    Blogger's Zone
                                </p>
                            </div>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className='form-control'
                                        id='floatingInputEmail'
                                        placeholder='example@gmail.com'
                                        ref={emailRef}
                                        style={{
                                            borderStyle: 'none',
                                            borderRadius: '0px',
                                            borderBottom: '1px solid grey'
                                        }}
                                    />
                                    <label htmlFor="floatingInputEmail">Email Address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className='form-control'
                                        id='floatingInputPassword'
                                        placeholder='Password'
                                        ref={passwordRef}
                                        style={{
                                            borderStyle: 'none',
                                            borderRadius: '0px',
                                            borderBottom: '1px solid grey'
                                        }}
                                    />
                                    <label htmlFor="floatingInputPassword">Password</label>
                                </div>

                                <div className="d-grid mb-2">
                                    <button
                                        className='btn btn-lg btn-secondary btn-login fw-bold text-uppercase'
                                        type="submit"
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        Log in
                                    </button>
                                </div>

                                <Link to="/register" className='d-block text-center mt-2 small fix'>
                                    Don't have an account? Register now
                                </Link>

                                <Link to="/forgot" className='d-block text-center mt-2 small fix'>
                                    Forgot Password ?
                                </Link>

                                <hr className='my-4' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login