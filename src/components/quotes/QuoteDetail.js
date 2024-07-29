import React, { useEffect, useState } from 'react'
import NavBar from '../common/NavBar'
import { HandThumbsDownFill, HandThumbsUpFill } from 'react-bootstrap-icons'
import Comment from '../blog/comments/Comment'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon } from 'react-share'
import '../blog/Blog.css'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { Link } from 'react-router-dom'

const QuoteDetail = () => {

    const { id } = useParams();

    const [quote, setQuote] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [authorQuotes, setAuthorQuotes] = useState([]);
    const [authorId, setAuthorID] = useState();
    const [likes, setLikes] = useState([]);

    const history = useHistory();

    const { currentUser } = useAuth();

    useEffect(() => {
        const single = db.collection('quotes').doc(id);

        single.get()
            .then(function (doc) {
                if (doc.exists) {
                    let data = doc.data();
                    setQuote(data);
                    setAuthorID(data.userId)
                }
            })
            .catch(function (error) {
                console.error("Error fetching doc", error);
            });

    }, [id]);

    useEffect(() => {
        db.collection('quotes').doc(id).collection('comments')
            .get()
            .then((snapshot) => {
                let commentData = [];
                snapshot.forEach((doc) => {
                    commentData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setComments(commentData);
            });
    }, [id]);

    useEffect(() => {
        db.collection('quotes').doc(id).collection('likes')
            .get()
            .then((snapshot) => {
                let likeData = [];
                snapshot.forEach((doc) => {
                    likeData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setLikes(likeData);
            });
    }, [id]);

    useEffect(() => {
        db.collection('quotes')
            .get()
            .then((snapshot) => {
                const quoteData = [];
                snapshot.forEach((doc) => {
                    if (doc.data().isApproved === true && doc.data().userId === authorId) {
                        const data = {
                            id: doc.id,
                            ...doc.data()
                        };
                        quoteData.push(data);
                    }
                });
                setAuthorQuotes(quoteData)
            });

    }, [authorId]);

    const addComment = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            setError(true);
            setSuccess(false);
            history.push("/login");
        } else {
            const commentData = {
                userId: currentUser.id,
                name: currentUser.username,
                email: currentUser.email,
                comment: comment,
                createdAt: new Date().toString(),
            };

            try {
                await db.collection("quotes").doc(id).collection("comments")
                    .add(commentData);
                setSuccess(true);
                setComment("");
                setError(false);
                setComments([commentData, ...comments]);
            } catch (error) {
                console.error(error);
                setError(true);
                setSuccess(false);
            }
        }
    }

    const addLike = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            history.push("/login");
        } else {
            await db.collection('quotes').doc(id).collection("likes").doc(currentUser.id)
                .set({ like: 1 });
            db.collection("quotes").doc(id).collection("likes").get()
                .then((snapshot) => {
                    let likeData = [];
                    snapshot.forEach((doc) => {
                        likeData.push(doc.data());
                    });
                    setLikes(likeData);
                });
        }
    };

    const disLike = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            history.push("/login");
        } else {
            await db.collection('quotes').doc(id).collection("likes").doc(currentUser.id)
                .delete();
            db.collection("quotes").doc(id).collection("likes").get()
                .then((snapshot) => {
                    let likeData = [];
                    snapshot.forEach((doc) => {
                        likeData.push(doc.data());
                    });
                    setLikes(likeData);
                });
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <NavBar />
            {quote && quote ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8">
                            <article>
                                <header className="mb-4">
                                    <h1 className='fw-bolder mb-1'>{quote.title}</h1>
                                    <div className="text-mutes fst-italic mb-2">
                                        Posted on {quote.updatedOn} by {quote.authorName}
                                    </div>

                                    <div>
                                        <div>
                                            <button className="btn btn-light" onClick={addLike}>
                                                <HandThumbsUpFill />
                                            </button>
                                            {(likes && likes.length > 0) && (
                                                <span className="badge rounded-pill bg-secondary">
                                                    {likes.length}
                                                </span>
                                            )}
                                            <button className="btn btn-light" onClick={disLike}>
                                                <HandThumbsDownFill />
                                            </button>
                                        </div>
                                    </div>
                                    {quote.categories && quote.categories.map((data) => (
                                        <p className="badge bg-secondary text-decoration-none link-light fs-6 mt-3" style={{ marginRight: "5px" }}>
                                            {data}
                                        </p>
                                    ))}
                                </header>

                                <section className="mb-5">
                                    <div className="fs-5 mb-4">
                                        <div dangerouslySetInnerHTML={{ __html: quote.description }} style={{ textAlign: 'justify' }} />
                                    </div>
                                </section>
                                <Comment comments={comments} />
                            </article>
                        </div>

                        <div className="col-lg-4">
                            <div className="d-flex flex-column border py-3">
                                <p className="author ps-3 ms-3"
                                    style={{
                                        position: 'relative',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        fontFamily: 'sans-serif',
                                        color: '#222'
                                    }}
                                >
                                    AUTHOR WIDGETS
                                </p>

                                <figure className='mb-4 d-flex justify-content-center'>
                                    <img
                                        className='img-fluid author-img'
                                        src="https://images.unsplash.com/photo-1579293676244-953f569610cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGF1dGhvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                        alt="AuthorImage"
                                        style={{
                                            width: '270px',
                                            height: '300px'
                                        }}
                                    />

                                </figure>

                                <div className='d-flex justify-content-center flex-column align-items-center pb-3'>
                                    <p>{quote.authorName}</p>
                                </div>

                                <div className="py-4">
                                    <p className="author ps-3 ms-3"
                                        style={{
                                            position: 'relative',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            fontFamily: 'sans-serif',
                                            color: '#222'
                                        }}
                                    >
                                        SOCIAL SHARE
                                    </p>
                                    <ul className="d-flex" style={{ listStyle: 'none' }} >
                                        <li className="px-1">
                                            <WhatsappShareButton
                                                url={window.location.href}
                                                quote={quote.title}
                                            >
                                                <WhatsappIcon logoFillColor="white" size={53} round={true} />
                                            </WhatsappShareButton>
                                        </li>
                                        <li className="px-1">
                                            <FacebookShareButton
                                                url={window.location.href}
                                                quote={quote.title}
                                            >
                                                <FacebookIcon logoFillColor="white" size={53} round={true} />
                                            </FacebookShareButton>
                                        </li>
                                        <li className="px-1">
                                            <TwitterShareButton
                                                url={window.location.href}
                                                quote={quote.title}
                                            >
                                                <TwitterIcon logoFillColor="white" size={53} round={true} />
                                            </TwitterShareButton>
                                        </li>
                                        <li className="px-1">
                                            <TelegramShareButton
                                                url={window.location.href}
                                                quote={quote.title}
                                            >
                                                <TelegramIcon logoFillColor="white" size={53} round={true} />
                                            </TelegramShareButton>
                                        </li>
                                    </ul>
                                </div>

                                <div className="py-4">
                                    <p className="author ps-3 ms-3"
                                        style={{
                                            position: 'relative',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            fontFamily: 'sans-serif',
                                            color: '#222'
                                        }}
                                    >
                                        POPULAR POSTS
                                    </p>

                                    {authorQuotes && authorQuotes.map((data) => (

                                        <div className="ps-3">
                                            <div className="d-flex flex-row">
                                                <div className="p-3">
                                                    <div dangerouslySetInnerHTML={{__html: data.description}} className='popular-quote-title' />
                                                    <p className='quote-comment'>BY - &nbsp;
                                                        <span style={{ fontWeight: 'bold' }}>{data.authorName}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="d-flex flex-column border py-3 my-3">
                                <p className="author ps-3 ms-3"
                                    style={{
                                        position: 'relative',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        fontFamily: 'sans-serif',
                                        color: '#222'
                                    }}
                                >
                                    MORE
                                </p>

                                <div className="card-body">
                                    <div className="col-12">
                                        <ul className="list-unstyled d-flex flex-wrap justify-content-start flex-row">
                                            <li className="px-2">
                                                <Link to="/quotes" className="text-decoration-none">
                                                    <p className='button-author'>quotes</p>
                                                </Link>
                                            </li>
                                            <li className="px-2">
                                                <Link to="/quotes" className="text-decoration-none">
                                                    <p className='button-author'>Quotes</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column border py-3 my-3">
                                <p className="author ps-3 ms-3"
                                    style={{
                                        position: 'relative',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        fontFamily: 'sans-serif',
                                        color: '#222'
                                    }}
                                >
                                    POST A COMMENT
                                </p>
                                {success && (
                                    <span>
                                        <div className="alert alert-success" role='alert'>
                                            Comment Posted
                                        </div>
                                    </span>
                                )}
                                {error && (
                                    <span>
                                        <div className="alert alert-danger" role='alert'>
                                            Something went wrong
                                        </div>
                                    </span>
                                )}

                                <form className="p-3"
                                    style={{
                                        color: "#222",
                                        fontWeight: '600',
                                        fontFamily: 'sans-serif'
                                    }}
                                    onSubmit={addComment}
                                >
                                    <div className="form-group py-3">
                                        <label htmlFor="commentTextArea" className="pb-1">Comment</label>
                                        <textarea className='form-control' rows="3" id="commentTextArea"
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <p className="button-author py-1 w-50">
                                        <button type='submit' style={{
                                            fontWeight: "bold"
                                        }} className="btn">Post Comment</button>
                                    </p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (<div>Loading...</div>)}
        </div>
    )
}

export default QuoteDetail