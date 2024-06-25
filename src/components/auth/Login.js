import React from 'react'
import logo from '../../images/writer.png'
import './Login.css';

const Login = () => {
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
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className='form-control'
                                        id='floatingInputEmail'
                                        placeholder='example@gmail.com'
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

                                <span className='d-block text-center mt-2 small'>
                                    Don't have an account? Register now
                                </span>

                                <span className='d-block text-center mt-2 small'>
                                    Forgot Password ?
                                </span>

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