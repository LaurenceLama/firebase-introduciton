import React from "react";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./App.css";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  //C of CRUD
  function createPost() {
    const post = {
      title: "Finish interview thing", //shift 4 to unleash $ dollar sign cuz why not
      description: "Program things",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post); // basically, this function means that we add everything inside the post(title, desc) inside the collection. "posts" is the name imprinted on the cloud firestore website
  }


  //R of CRUD
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef); // postRef = post reference - reference of the post, where it came from I think
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"), // which collection are we loooking into?
      where("uid", "==", user.uid) // what post do we want to fetch
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  //U of CRUD
  async function updatePost() {
     const hardcodedId = "1sk6IUF26VNTnZY7A0vE";
     const postRef = doc(db, "posts", hardcodedId);
     const post = await getPostById(hardcodedId)
     console.log(post)
     const newPost = {
      ...post, //spread operator (the ... part) copies all data and puts inside the post word, then title is the except cuz yu want to update that(in this scenario)
      title: "Land a $400k job"
     };
     console.log(newPost)
     updateDoc(postRef, newPost);
  }

  //D CRUD
  function deletePost() {
    const hardcodedId = "1sk6IUF26VNTnZY7A0vE";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef)
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
        setLoggedIn(true);
      }
    });
  }, []); //useEffect command for automatic logins when refreshing page

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
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
    setLoggedIn(false);
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
      <br></br>

      <button onClick={createPost}>Create Post bro</button>
      <br></br>
      <br></br>
      <button onClick={getAllPosts}>Post all posts</button>
      <br></br>
      <br></br>
      <button onClick={getPostById}>Get post by Id</button>
      <br></br>
      <br></br>
      <button onClick={getPostByUid}>Get post by Uid</button>
      <br></br>
      <br></br>
      <button onClick={updatePost}>Update post</button>
      <br></br>
      <br></br>
      <button onClick={deletePost}>Delete post</button>
    </>
  );
}

export default App;
