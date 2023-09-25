import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("isLoggedIn");

    if (storedUserInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;

// useEffect is used for side effect actions. For example, Data fetching like local storage stuff for login/logout data. It doesn't directly affect the UI,
// rather this side affect handles the data which the JSX UI components will then react to how it's being used/the endgoal

// React's Main job is to Render UI and React to User Inputs
// 1. Managing state & props
// 2. React to user event and input
// 3. Re-eval component based on state and prop changes

// Side Effects are literally anything else
// 1. Storing data in browser storage
// 2. Sending HTTP requests to backend servers
// 3. Set & Manage timers

// Side Effects must happen outside of normal component evaluation and render cycle since they might block delay rendering
// Side Effects are hooks that help with code that should be executed in response to something, such as component being loaded, email address being updated
// whenever you have an action that should be executed in response to some other action. That is a side effect
