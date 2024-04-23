import { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


// REACT_APP_API_URL_HTTPS="https://planningpoker-server-dot-smoothwall-sandbox.nw.r.appspot.com"
// REACT_APP_API_URL_WS="wss://planningpoker-server-dot-smoothwall-sandbox.nw.r.appspot.com"

// REACT_APP_API_URL_HTTPS="http://localhost:8080"
// REACT_APP_API_URL_WS="ws://localhost:8080"

// VITE_API_URL_HTTPS="http://localhost:8080"
// VITE_POKER_API_URL_WS="ws://localhost:8081"


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');    
    if(!token){
      navigate("login");
    } else {
      navigate("app")
    }
  }, [])

  return <></>;
}




export default App;
