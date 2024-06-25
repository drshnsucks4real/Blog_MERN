import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <footer className='site-footer text-light'
        style={{ backgroundColor: "#111" }}
      >
        <div className="container px-4 py-5">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <p className="author ps-3"
                style={{
                  position: "relative",
                  fontWeight: "bold",
                  fontSize: "18px",
                  fontFamily: "sans-serif"
                }}
              >
                BLOGGER'S ZONE OFFICIAL
              </p>
              <p className="s-3" style={{ fontSize: "17px", textAlign: "justify" }}>
                Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
              </p>
            </div>

            <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
              <ul className='list-unstyled mb-0'></ul>
            </div>

            <div className='col-lg-3 col-md-6 mb-4 mb-md-0 text-light'>
              <ul className='list-unstyled text-light'>
                <li className="py-2">
                  <span className="text-light text-capitalize">
                    Home
                  </span>
                </li>
                <li className="py-2">
                  <span className="text-light text-capitalize">
                    Blog
                  </span>
                </li>
                <li className="py-2">
                  <span className="text-light text-capitalize">
                    About us
                  </span>
                </li>
                <li className="py-2">
                  <span className="text-light text-capitalize">
                    Contact us
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr style={{ color: "#e07624" }} />
        <div className="text-center p-3">
          @2024 Copyright : &nbsp;
          <span>Blogger's Zone</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer