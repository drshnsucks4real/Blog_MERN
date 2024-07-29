import React, { useEffect, useState } from 'react'
import NavBar from '../common/NavBar';
import Footer from '../common/footer/Footer';
import { useParams } from 'react-router';
import { db } from '../../firebase';

const QuoteApproval = () => {
    const { id } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [quote, setQuote] = useState();

    useEffect(() => {
        const singleQuote = db.collection('quotes').doc(id);
        singleQuote.get()
            .then(function (doc) {
                if (doc.exists) {
                    let data = doc.data();
                    setQuote(data);
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            })
    }, [id]);

    const handleApprove = async (e) => {
        e.preventDefault();
        try {
            await db.collection('quotes').doc(id).update({
                isApproved: true,
            });
            setSuccess(true);
            setError(false);
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
        } catch (error) {
            setSuccess(false);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        try {
            await db.collection('quotes').doc(id).delete();
            setSuccess(true);
            setError(false);
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
        } catch (error) {
            setSuccess(false);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
    }
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <NavBar />
            {quote && quote ? (
                <div className="container mt-5">
                    <div>
                        <article>
                            {success && (
                                <div className="alert alert-success" role='alert'>
                                    Success !
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role='alert'>
                                    Oops Something went wrong !
                                </div>
                            )}

                            <header className='mb-4'>
                                <button className="btn btn-success" onClick={handleApprove}>
                                    Approve
                                </button>
                                <button className="btn btn-danger ml-3" onClick={handleReject}>
                                    Reject
                                </button>
                                <div className="text-muted fst-italic mb-2">
                                    Posted on {quote.updatedOn} by {quote.authorName}
                                </div>
                            </header>

                            <section className="mb-5"
                                style={{
                                    textAlign: 'justify',
                                    width: '800px'
                                }}
                            >
                                <p className="fs-5 mb-4">
                                    <div dangerouslySetInnerHTML={{ __html: quote.description }}></div>
                                </p>
                            </section>

                        </article>
                    </div>
                </div>
            ) : (<div>Loading....</div>)}
            <Footer />
        </div>
    )
}

export default QuoteApproval