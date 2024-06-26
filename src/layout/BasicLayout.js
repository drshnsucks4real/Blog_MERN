import NavBar from '../components/common/NavBar'
import Footer from '../components/common/footer/Footer'

const BasicLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    )
}

export default BasicLayout