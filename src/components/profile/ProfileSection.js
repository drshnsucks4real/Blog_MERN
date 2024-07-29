import { Line } from 'rc-progress';
import React, { useEffect, useRef, useState } from 'react'
import Avatar from 'react-avatar'
import { PlusCircle } from 'react-bootstrap-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../common/card/Card'
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router';
import { db } from '../../firebase';


const ProfileSection = () => {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [showBlogForm, setShowBlogForm] = React.useState(false);
    const [showQuoteForm, setShowQuoteForm] = React.useState(false);
    const [userBlogs, setUserBlogs] = useState([]);
    const [userQuotes, setUserQuotes] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [progressShow, setProgressShow] = useState(false);
    const [done, setDone] = useState(0);

    const blogTitle = useRef();
    const blogCategories = useRef();
    const blogSocial = useRef();
    const [blogContent, setBlogContent] = useState('');
    const [blogImage, setBlogImage] = React.useState();
    const [quoteContent, setQuoteContent] = useState('');

    useEffect(() => {
        if (currentUser && currentUser.userId) {
            db.collection('blogs').get()
                .then((snapshot) => {
                    const blogData = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().userId === currentUser.userId) {
                            const data = {
                                id: doc.id,
                                ...doc.data()
                            };
                            blogData.push(data);
                        }
                    });
                    setUserBlogs(blogData);
                });
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && currentUser.userId) {
            db.collection('quotes').get()
                .then((snapshot) => {
                    const quoteData = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().userId === currentUser.userId) {
                            const data = {
                                id: doc.id,
                                ...doc.data()
                            };
                            quoteData.push(data);
                        }
                    });
                    setUserQuotes(quoteData);
                });
        }
    }, [currentUser]);

    const addBlog = async (e) => {
        e.preventDefault();
        setProgressShow(true);
        setDone(55);
        try {
            if (!blogImage) {
                await db.collection('blogs').add({
                    authorName: currentUser.username,
                    isFeatured: false,
                    isApproved: false,
                    title: blogTitle.current.value,
                    description: blogContent,
                    categories: blogCategories.current.value.split(','),
                    social: blogSocial.current.value,
                    updatedOn: new Date().toString(),
                    userId: currentUser.userId
                });
                setDone(100);
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    setSuccess(false);
                    setProgressShow(false);
                    setDone(0);
                }, 3000);
            } else {
                const data = new FormData();
                data.append('file', blogImage);
                data.append('upload_preset', 'bloggers_zone');
                data.append('cloud_name', 'dymrrz7io')
                await fetch('https://api.cloudinary.com/v1_1/dymrrz7io/image/upload', {
                    method: 'POST',
                    body: data
                })
                    .then((res) => res.json())
                    .then((data) => {
                        db.collection('blogs').add({
                            authorName: currentUser.username,
                            isFeatured: false,
                            isApproved: false,
                            title: blogTitle.current.value,
                            description: blogContent,
                            images: [data.url],
                            categories: blogCategories.current.value.split(','),
                            social: blogSocial.current.value,
                            updatedOn: new Date().toString(),
                            userId: currentUser.userId
                        });
                    });
                setDone(100);
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    setSuccess(false);
                    setProgressShow(false);
                    setDone(0);
                }, 3000);
            }
        } catch (error) {
            setError(true);
            setSuccess(false);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }

    const addQuote = async (e) => {
        e.preventDefault();
        setProgressShow(true);
        setDone(55);
        try {
            await db.collection('quotes').add({
                authorName: currentUser.username,
                isFeatured: false,
                isApproved: false,
                description: quoteContent,
                updatedOn: new Date().toString(),
                userId: currentUser.userId
            });
            setDone(100);
            setSuccess(true);
            setError(false);
            setTimeout(() => {
                setSuccess(false);
                setProgressShow(false);
                setDone(0);
            }, 3000);

        } catch (error) {
            setError(true);
            setSuccess(false);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }

    }

    const removeBlog = (id) => {
        setUserBlogs(userBlogs.filter((blog) => blog.id !== id));
    };

    const removeQuote = (id) => {
        setUserQuotes(userQuotes.filter((quote) => quote.id !== id));
    }

    return (
        <div className='container'>
            <div>
                <div className="ms-3">
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="card mt-5">
                            <div className="text-center text-dark" style={{ width: "800px" }}>
                                <div>
                                    {' '}
                                    <Avatar name={currentUser && currentUser.username} round="50px" />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <h4 className='mb-0 text-dark'
                                    style={{ fontSize: '32px', fontFamily: 'Dancing Script' }}
                                >
                                    {currentUser && currentUser.username}
                                </h4> {' '}
                                <span className="text-muted d-block mb-2" style={{ fontSize: '22px' }}>
                                    {currentUser && currentUser.email}
                                </span> {' '}
                                <br />
                                <div className="container d-flex justify-content-center mt-4 px-4">
                                    <div>
                                        <h6
                                            className='mb-0 text-dark'
                                            style={{
                                                fontSize: '28px',
                                                fontFamily: 'Dancing Script'
                                            }}
                                        >
                                            Blogs
                                            <div>
                                                <PlusCircle
                                                    onClick={() => {
                                                        setShowBlogForm(true);
                                                        setShowQuoteForm(false)
                                                    }}
                                                    fontSize={20}
                                                    color='green'
                                                />
                                            </div>{' '}
                                            <span className="fs-5">{userBlogs.length}</span>
                                        </h6>
                                    </div>
                                    <div className='ml-4'>
                                        <h6
                                            className='mb-0 text-dark'
                                            style={{
                                                fontSize: '28px',
                                                fontFamily: 'Dancing Script'
                                            }}
                                        >
                                            Quotes
                                            <div>
                                                <PlusCircle
                                                    onClick={() => {
                                                        setShowQuoteForm(true);
                                                        setShowBlogForm(false);
                                                    }}
                                                    fontSize={20}
                                                    color='green'
                                                />
                                            </div>{' '}
                                            <span className="fs-5"> {userQuotes.length} </span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className="container d-flex flex-column justify-content-center">
                        {currentUser.isAdmin && (
                            <>

                                <button className="btn btn-primary ms-3 mt-2"
                                    onClick={() => history.push("/approval")}
                                >
                                    Approvals
                                </button>
                                <button className="btn btn-primary ms-3 mt-2"
                                    onClick={() => history.push("/feature")}
                                >
                                    Feature
                                </button>
                            </>

                        )}
                    </div>
                </div>
                {showBlogForm && (
                    <form onSubmit={addBlog}>
                        {success && (
                            <div className="alert alert-success" role='alert'>
                                Success! Your blog is added and will be posted once approved by Admin
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role='alert'>
                                Something went wrong !
                            </div>
                        )}

                        {progressShow && (
                            <div className="d-flex">
                                <Line
                                    percent={done}
                                    strokeWidth={2}
                                    strokeColor="green"
                                />
                                <span>{done}%</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="blogImage">Image:</label>
                            <input
                                type="file"
                                className='p-3'
                                onChange={(e) => setBlogImage(e.target.files[0])}
                            />

                            {blogImage && (
                                <img src={URL.createObjectURL(blogImage)} alt="blogImg" style={{ height: '120px' }} />
                            )}
                        </div>

                        <div className="form-group">
                            <br />
                            <input
                                type="text"
                                className='form-control'
                                id="blogTitle"
                                placeholder='Title'
                                ref={blogTitle}
                                style={{
                                    borderStyle: 'none',
                                    borderRadius: '0px',
                                    borderBottom: '1px solid grey'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <br />
                            <input
                                type="text"
                                className='form-control'
                                id="blogTitle"
                                placeholder='Categories'
                                ref={blogCategories}
                                style={{
                                    borderStyle: 'none',
                                    borderRadius: '0px',
                                    borderBottom: '1px solid grey'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <br />
                            <input
                                type="text"
                                className='form-control'
                                id="blogTitle"
                                placeholder='Social Media Links'
                                ref={blogSocial}
                                style={{
                                    borderStyle: 'none',
                                    borderRadius: '0px',
                                    borderBottom: '1px solid grey'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <br />
                            <ReactQuill
                                type="text"
                                placeholder='Description'
                                value={blogContent}
                                onChange={(value) => setBlogContent(value)}
                                style={{ height: '200px' }}
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-secondary mt-5'
                        >
                            Submit
                        </button>
                    </form>
                )}

                {showQuoteForm && (
                    <form onSubmit={addQuote}>
                        {success && (
                            <div className="alert alert-success" role='alert'>
                                Success! Your quote is added and will be posted once approved by Admin
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role='alert'>
                                Something went wrong !
                            </div>
                        )}

                        {progressShow && (
                            <div className="d-flex">
                                <Line
                                    percent={done}
                                    strokeWidth={2}
                                    strokeColor="green"
                                />
                                <span>{done}%</span>
                            </div>
                        )}

                        <div className="form-group">
                            <br />
                            <ReactQuill
                                type="text"
                                placeholder='Description'
                                style={{ height: '200px' }}
                                value={quoteContent}
                                onChange={(value) => setQuoteContent(value)}
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-secondary mt-5'
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
            <div className="pt-5">
                <div className="container d-flex justify-content-center p-4">
                    <h2 style={{ fontFamily: 'Dancing Script' }}>My Blogs</h2>
                </div>

                <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
                    {userBlogs.length > 0 ? (
                        userBlogs && userBlogs.map((data) => (
                            <Card
                                image={data.images[0]}
                                content={data.description}
                                title={data.title}
                                author={data.authorName}
                                date={data.updatedOn}
                                url={`/blog/${data.id}`}
                                id={data.id}
                                collection={'blogs'}
                                isApproved={data.isApproved}
                                deleteOption={true}
                                removeData={(data) => removeBlog(data.id)}
                            />
                        ))
                    ) : (<div className="d-flex justify-content-center">No Blogs Yet</div>)}
                </div>

            </div>

            <div className="pt-5">
                <div className="container d-flex justify-content-center p-4">
                    <h2 style={{ fontFamily: 'Dancing Script' }}>My Quotes</h2>
                </div>

                <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
                    {userQuotes.length > 0 ? (
                        userQuotes && userQuotes.map((data) => (
                            <Card
                                content={data.description}
                                author={data.authorName}
                                date={data.updatedOn}
                                url={`/quote/${data.id}`}
                                id={data.id}
                                collection={'quotes'}
                                isApproved={data.isApproved}
                                deleteOption={true}
                                removeData={(data) => removeQuote(data.id)}
                            />
                        ))
                    ) : (<div className="d-flex justify-content-center">No Quotes Yet</div>)}
                </div>
            </div>
        </div>
    )
}

export default ProfileSection