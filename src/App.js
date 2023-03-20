import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import RegisterUser from './components/Register/RegisterUser';
import RegisterationPage from './Pages/RegisterationPage';
import Loginpage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = { <RegisterationPage/>} />
        <Route path="/Login" element = { <Loginpage/>} />
        <Route path="/Home" element = { <HomePage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
