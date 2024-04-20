import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Editpost = ({
  posts,
  handleEdit,
  editTitle,
  setEditTiltle,
  editBody,
  setEditBody,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTiltle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTiltle, setEditBody]);
  return (
    <main className="NewPost">
      {editTitle && <>
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="postTitle">Title</label>
        <input
          id="postTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTiltle(e.target.value)}
        />
        <label htmlFor="postBody">Body</label>
        <textarea
        id="postBody"
        required
        value={editBody}
        onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
        </form>
        </>}
        {!editTitle &&
            <> <h1>Post not found</h1>
            <Link to="/">Home</Link>
            </>
        }
    </main>
  );
};

export default Editpost;
