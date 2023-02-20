import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home.jsx'
import FormBar from './components/FormBar/FormBar.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp';
import Password from './components/Password/Password.jsx';
import axios from "axios";

// axios.defaults.baseURL = "https://grupo13-pf-production.up.railway.app/";
axios.defaults.baseURL = "http://localhost:3001/"


function App() {
  return (
      <div className="App">
        <Route exact path="/"> <Home/> </Route>
        <Route path="/newplace"> <FormBar/> </Route>
        <Route path="/login"> <Login/> </Route>
        <Route path="/sign-up"> <SignUp/> </Route>
        <Route path="/forgot-password"> <Password/> </Route>        
      </div>
  );
}

export default App;