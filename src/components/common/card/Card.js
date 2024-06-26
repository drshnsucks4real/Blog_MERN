import React from 'react'
import deafultImg from '../../../images/feather.jpeg'
import './Card.css'

const Card = () => {
    return (
        <div className='card card-single shadow mx-4 my-3 single-card blog-card p-2 flex-1'
            style={{ width: '350px' }}
        >

            <div className="img-container d-flex" style={{ maxHeight: '150px', minHeight: '150px' }}>
                <img src={deafultImg} alt="..." className="card-img-top" style={{ objectFit: 'cover' }} />
            </div>

            <div className="card-body p-2">
                <p className="card-title text-dark title"
                    style={{ fontSize: '20px', fontWeight: '600' }}
                >
                    Title
                </p>
                <div className="d-flex justify-content-between m-2">
                    <p className="small text-dark">20/10/2008</p>
                </div>
                <p className="card-text content py-1 mt-0 mb-4 pt-0 text-dark"
                    style={{ minHeight: '70px', maxHeight: '70px', fontSize: '17px' }}
                >
                    <div>
                        Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
                        Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
                    </div>
                </p>
                <div className="links d-flex justify-content-between align-items-center m-0 p-1">
                    <p className="small pb-0 pt-1 m-0" style={{ fontWeight: "700" }}>Author Name</p>
                    <span className="py-0">
                        Read more
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card