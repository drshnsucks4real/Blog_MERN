import './App.css';
import NavBar from './components/common/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/auth/Login';
import Footer from './components/common/footer/Footer';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Login/>
    <Footer/>
    </div>
  );
}

export default App;
