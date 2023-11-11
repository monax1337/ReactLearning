import React, { useContext, useEffect, useState } from "react";
import './Styles/App.css';
import { BrowserRouter } from "react-router-dom";
import MyNavbar from "./Componets/UI/navbars/MyNavbar";
import AppRouter from "./Componets/AppRouter";
import { AuthContext } from "./Contexts";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
