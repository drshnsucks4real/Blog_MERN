import React, { useEffect, useState } from 'react'
import NavBar from '../common/NavBar';
import Footer from '../common/footer/Footer';
import { useParams } from 'react-router';
import { db } from '../../firebase';

const BlogFeature = () => {

    const { id } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [blog, setBlog] = useState();

    useEffect(() => {
        const singleBlog = db.collection('blogs').doc(id);
        singleBlog.get()
            .then(function (doc) {
                if (doc.exists) {
                    let data = doc.data();
                    setBlog(data);
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            })
    }, [id]);

    const handleFeature = async (e) => {
        e.preventDefault();
        try {
            await db.collection('blogs').doc(id).update({
                isFeatured: true,
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

    const handleUnFeature = async (e) => {
        e.preventDefault();
        try {
            await db.collection('blogs').doc(id).update({
                isFeatured: false,
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


    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <NavBar />
            {blog && blog ? (
                <div className="container mt-5">
                                {blog.isFeatured && <div className='fw-bolder mb-2'>This Blog is Featured</div>}
                    <figure className="mb-4">
                        <img src={blog.images[0]} alt="approval" className="img-fluid rounded" style={{ height: '520px', width: '800px' }} />
                    </figure>
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
                                <h1 className='fw-bolder mb-1'>{blog.title}</h1>
                                <button className="btn btn-success" onClick={handleFeature}>
                                    Feature
                                </button>
                                <button className="btn btn-danger ml-3" onClick={handleUnFeature}>
                                    Un-Feature
                                </button>
                                <div className="text-muted fst-italic mb-2">
                                    Posted on {blog.updatedOn} by {blog.authorName}
                                </div>
                            </header>

                            <section className="mb-5"
                                style={{
                                    textAlign: 'justify',
                                    width: '800px'
                                }}
                            >
                                <p className="fs-5 mb-4">
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
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

export default BlogFeature