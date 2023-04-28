import React from "react";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import "./App.css";

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user)
        setLoggedIn(true);
      }
    })
  }, []) //useEffect command for automatic logins when refreshing page

  function register() {
    createUserWithEmailAndPassword(auth, "example@email.com", "passwurd")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        console.log(error);
        // const errorMessage = error.message;
        // ..
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "example@email.com", "passwurd")
      .then(({user}) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({})
    setLoggedIn(false)
  }

  return (
    <>
      <div className="intro">
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        {loading ? "loading... WAIT" : user.email}
      </div>

      <br></br>
      {/* exercise wants to logout using the mounted initial of the acc name, then also add another loading state for that logout function */}
      <div className="exercise">
        {!loggedIn && <button onClick={register}>Register</button>}
        {!loggedIn && <button onClick={login}>Login</button>}
        {loggedIn && (
          <button onClick={logout}>{user.email[0].toUpperCase()}</button>
        )}
      </div>
    </>
  );
}

export default App;
