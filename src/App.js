import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import Editpost from "./Editpost";
import useWindowSize from "./Hooks/useWindowSize";
import useAxiosFetch from "./Hooks/useAxiosFetch";

function App() {
  //get all posts
  const [posts, setPosts] = useState([]);
  //search for posts
  const [search, setSearch] = useState("");
  //search result
  const [searchresult, setSearchresult] = useState([]);
  //create post title and body
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  //update post title and body
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  //navigate to redirect from functions
  const Navigate = useNavigate();
  //custom hook
  const { width } = useWindowSize();
  // useAxiosfetch custom hook to retrive data from server
  const { data, isLoading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  //use effect to get data  from custom hook and load in your app useState
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  /* useEffect(() => {
    const fetchposts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        } else {
          console.log(`error ${error.message}`);
        }
      }
    };
    fetchposts();
  }, []); */

  useEffect(() => {
    const filterResult = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchresult(filterResult.reverse());
  }, [posts, search]);

  //create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy HH:mm:ss");
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(`error ${error.message}`);
      }
    }
    setPostTitle("");
    setPostBody("");
    Navigate("/");
  };

  //update post
  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy HH:mm:ss");
    const updatePost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      Navigate("/");
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(`error ${error.message}`);
      }
    }
    setPostTitle("");
    setPostBody("");
    Navigate("/");
  };

  //delete post
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`).then(() => {
        setPosts(posts.filter((post) => post.id !== id));
        Navigate("/");
      });
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(`error ${error.message}`);
      }
    }
  };

  return (
    <div className="App">
      <Header title="Movie media" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchresult}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route
          path="edit/:id"
          element={
            <Editpost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTiltle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
