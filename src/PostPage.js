import React from 'react'
import { Link, useParams } from 'react-router-dom'
const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams();
  const post=posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
    <article className='post'>
    {post &&
      <>
      <h1>{post.title}</h1>
      <p className='postDate'>{post.date}</p>
      <p className='postBody'>{post.body}</p>
      <Link to={`/edit/${post.id}`}><button className='edit-btn'>Edit</button></Link>
      <button className='delete-btn' onClick={()=>handleDelete(post.id)}>Delete</button>
      </>
    }
    {!post &&
      <> <h1>Post not found</h1>
      <Link to="/">Home</Link>
      </>
    }
    </article>
    </main>
  )
}

export default PostPage
