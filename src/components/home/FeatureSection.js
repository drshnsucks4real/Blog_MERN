import React, { useEffect, useState } from 'react'
import Card from '../common/card/Card'
import { db } from '../../firebase';


const FeatureSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    db.collection("blogs").get()
      .then((snapshot) => {
        const blogData = [];
        snapshot.forEach((doc) => {
          if (doc.data().isApproved === true && doc.data().isFeatured === true) {
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
  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-5'
      style={{ width: '100vw', backgroundColor: '#EFEFEF' }}
    >
      <h2
        className='pt-3 text-dark text-capitalize font-weight-bold fs-1 p-0 m-0'
        style={{
          paddingLeft: '20px',
          fontFamily: "Dancing Script",
          borderBottom: '2px solid #222',
          paddingBottom: '1px'
        }}
      >
        Featured Blogs
      </h2>
      <div className="d-flex flex column align-items-center justify-content-center py-5">
        {blogs.length > 0 ? (
          blogs && blogs.map((data) => (
            <Card
              image={data.images[0]}
              content={data.description}
              title={data.title}
              author={data.authorName}
              date={data.updatedOn}
              isApproved={data.isApproved}
              isFeatured={data.isFeatured}
              url={`/blog/${data.id}`}
            />
          ))
        ) : (<div className="d-flex justify-content-center">No Blogs Featured Yet</div>)}
      </div>
    </div>
  )
}

export default FeatureSection