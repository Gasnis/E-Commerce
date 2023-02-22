import './App.css';
import { Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp';
import axios from "axios";

axios.defaults.baseURL = "https://e-commerce-production-f31a.up.railway.app/";
// axios.defaults.baseURL = "http://localhost:3001/"


function App() {
const history = useHistory()

  return (
      <div className="App">
        <Route path="/push">{history.push("/login")}</Route>
        <Route path="/login"> <Login/> </Route>
        <Route path="/sign-up"> <SignUp/> </Route>    
        <Route exact path="/home"> <Home/> </Route>
      </div>
  );
}

export default App;