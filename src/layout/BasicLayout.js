import NavBar from '../components/common/NavBar'
import Footer from '../components/common/footer/Footer'

const BasicLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}

export default BasicLayout