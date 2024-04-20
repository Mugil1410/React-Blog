
const NewPost = ({handleSubmit,postTitle,setPostTitle,postBody,setPostBody}) => {
  return (
    <main className="NewPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
      <label htmlFor="postTitle">Title</label>
      <input
        id="postTitle"
        type="text"
        required
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        placeholder="Title"
        />
        <label htmlFor="postBody">Body</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost
