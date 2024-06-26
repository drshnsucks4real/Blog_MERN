import React from 'react'
import Card from '../common/card/Card'

const FeatureSection = () => {
  return (
    <div style={{ zIndex: '2' }}>
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
          <Card />
          {/* <Card />
          <Card /> */}
        </div>
      </div>
    </div>
  )
}

export default FeatureSection