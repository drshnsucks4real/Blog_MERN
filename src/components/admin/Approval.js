import React, { useState } from 'react'
import Card from '../common/card/Card'
import { useEffect } from 'react';
import { db } from '../../firebase';

const Approval = () => {

    const [blogs, setBlogs] = useState([]);
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        db.collection("blogs").get()
            .then((snapshot) => {
                const blogData = [];
                snapshot.forEach((doc) => {
                    if (doc.data().isApproved === false) {
                        const data = {
                            id: doc.id,
                            ...doc.data()
                        };
                        blogData.push(data);
                    }
                });
                setBlogs(blogData);
            });
    }, []);

    useEffect(() => {
        db.collection("quotes").get()
            .then((snapshot) => {
                const quoteData = [];
                snapshot.forEach((doc) => {
                    if (doc.data().isApproved === false) {
                        const data = {
                            id: doc.id,
                            ...doc.data()
                        };
                        quoteData.push(data);
                    }
                });
                setQuotes(quoteData);
            });
    }, []);

    return (
        <div>
            <div>
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <h2
                        className='pt-2 text-dark text-capiitalize font-weight-bold fs-1 p-0 m-0'
                        style={{
                            paddingLeft: '20px',
                            fontFamily: "Dancing Script",
                            borderBottom: '2px solid #222',
                            paddingBottom: '1px'
                        }}
                    >
                        Approve Blogs
                    </h2>

                    <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-5">
                        {blogs.length > 0 ? (
                            blogs && blogs.map((data) => (
                                <Card
                                    image={data.images[0]}
                                    content={data.description}
                                    title={data.title}
                                    author={data.authorName}
                                    date={data.updatedOn}
                                    url={`/approval/blog/${data.id}`}
                                />
                            ))
                        ) : (<div className="d-flex justify-content-center">No Blogs Yet</div>)}
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <h2
                        className='pt-2 text-dark text-capiitalize font-weight-bold fs-1 p-0 m-0'
                        style={{
                            paddingLeft: '20px',
                            fontFamily: "Dancing Script",
                            borderBottom: '2px solid #222',
                            paddingBottom: '1px'
                        }}
                    >
                        Approve Quotes
                    </h2>

                    <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-5">
                        {quotes.length > 0 ? (
                            quotes && quotes.map((data) => (
                                <Card
                                    content={data.description}
                                    author={data.authorName}
                                    date={data.updatedOn}
                                    url={`/approval/quote/${data.id}`}
                                />
                            ))
                        ) : (<div className="d-flex justify-content-center">No Quotes Yet</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Approval