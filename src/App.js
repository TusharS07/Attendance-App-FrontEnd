import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import RegisterUser from './components/Register/RegisterUser';
import RegisterationPage from './Pages/RegisterationPage';
import Loginpage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Record from './components/Home/Record';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/Admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = { <RegisterationPage/>} />
        <Route path="/Login" element = { <Loginpage/>} />
        <Route path="/Home" element = { <HomePage/>} />
        <Route path="/Record" element = { <Record/>} />
        <Route path="/Admin" element = { <Admin/>} />
        <Route path="/AdminLogin" element = { <AdminLogin/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
