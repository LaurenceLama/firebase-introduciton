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

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user)
      if (user) {
        setUser(user)
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
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading... WAIT' : user.email}
    </div>
  );
}

export default App;
