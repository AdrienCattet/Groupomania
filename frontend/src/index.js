import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Welcome from './pages/Welcome.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import NewPost from './pages/NewPost.jsx';
import ModifyPost from './pages/ModifyPost.jsx';
import Error404 from './pages/Error404.jsx';

import './styles/global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<Welcome />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/posts' element={<Posts />}></Route>
        <Route path='/newpost' element={<NewPost />}></Route>
        <Route path='/posts/:postId' element={<Post />}></Route>
        <Route path='/modifypost/:postId' element={<ModifyPost />}></Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);