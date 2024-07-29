import React from 'react'
import './Card.css'
import { db } from '../../../firebase'
import { Trash } from 'react-bootstrap-icons';
import { useHistory } from 'react-router';
import { format } from 'timeago.js';

const Card = ({
    image,
    content,
    title,
    date,
    url,
    author,
    id,
    isApproved,
    isFeatured,
    deleteOption,
    collection,
    removeData
}) => {

    const history = useHistory();

    const deletePost = async () => {
        try {
            await db.collection(`${collection}`).doc(id).delete();
            removeData(id);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='card card-single shadow mx-4 my-3 single-card blog-card p-2 flex-1'
            style={{ width: '350px' }}
        >

            {image && (
                <div className="img-container d-flex" style={{ maxHeight: '150px', minHeight: '150px' }}>
                    <img src={image} alt="..." className="card-img-top" style={{ objectFit: 'cover' }} />
                </div>
            )}

            <div className="card-body p-2">
                <p className="card-title text-dark title"
                    style={{ fontSize: '20px', fontWeight: '600' }}
                >
                    {title}
                </p>
                <div className="d-flex justify-content-between m-2">
                    <p className="small text-dark">{format(date)}</p>
                </div>
                <div className="card-text content py-1 mt-0 mb-4 pt-0 text-dark"
                    style={{ minHeight: '70px', maxHeight: '70px', fontSize: '17px' }}
                >
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <div className="links d-flex justify-content-between align-items-center m-0 p-1">
                    <p className="small pb-0 pt-1 m-0" style={{ fontWeight: "700" }}>{author}</p>
                    <button onClick={() => {
                        history.push(url);
                    }} className="btn">
                        Read more
                    </button>
                </div>
                <div className="d-flex justify-content-between">
                    {!isApproved && <p className='text-danger'>Awaiting Approval</p>}
                    {isFeatured && <p className='text-success'>Featured</p>}
                    {deleteOption && (
                        <Trash onClick={deletePost} fontSize={25} color='red' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card