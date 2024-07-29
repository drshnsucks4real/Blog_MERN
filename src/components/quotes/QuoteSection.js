import React, {useEffect, useState} from 'react'
import NavBar from '../common/NavBar'
import Card from '../common/card/Card'
import Footer from '../common/footer/Footer'
import { motion } from 'framer-motion';
import { db } from '../../firebase';

const QuoteSection = () => {

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        db.collection("quotes").get()
            .then((snapshot) => {
                const quoteData = [];
                snapshot.forEach((doc) => {
                    if (doc.data().isApproved === true) {
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div
                style={{
                    minHeight: '100vh',
                    width: '100vw',
                    backgroundColor: '#EFEFEF',
                }}
            >
                <NavBar />
                <div className="container d-flex justify-content-center p-4">
                    <h1 style={{ fontFamily: 'Dancing Script' }} > Quotes</h1>
                </div>

                <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
                    style={{ width: '100vw' }}
                >
                    {quotes.length > 0 ? (
                        quotes && quotes.map((data) => (
                            <Card
                                content={data.description}
                                author={data.authorName}
                                date={data.updatedOn}
                                isApproved={data.isApproved}
                                url={`/quote/${data.id}`}
                            />
                        ))
                    ) : (<div className="d-flex justify-content-center">No Quotes Yet</div>)}
                </div>
                <Footer />
            </div>
        </motion.div>
    )
}

export default QuoteSection