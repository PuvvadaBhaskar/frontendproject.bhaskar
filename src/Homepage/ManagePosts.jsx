import React, { useEffect, useState } from 'react'

export default function ManagePosts(){
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    try { const raw = localStorage.getItem('posts'); if (raw) setPosts(JSON.parse(raw)) } catch (err) { void err }
  }, [])

  function add(){
    const obj = { id: Date.now(), title, author, published: false }
    const next = [obj, ...posts]
    setPosts(next)
    try { localStorage.setItem('posts', JSON.stringify(next)) } catch (err) { void err }
    setTitle(''); setAuthor('')
  }

  function remove(id){
    const next = posts.filter(p => p.id !== id)
    setPosts(next)
    try { localStorage.setItem('posts', JSON.stringify(next)) } catch (err) { void err }
  }

  function togglePublish(id){
    const next = posts.map(p => p.id === id ? { ...p, published: !p.published } : p)
    setPosts(next)
    try { localStorage.setItem('posts', JSON.stringify(next)) } catch (err) { void err }
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', gap:12, marginBottom:16}}>
        <button className="proceed-btn" onClick={() => {/* focus add area */}}>Add Post</button>
        <button className="action-btn" onClick={() => {/* noop: already managing posts */}}>Manage Posts</button>
      </div>

      <h2 style={{textAlign:'center', marginTop:0}}>Manage Posts</h2>

      <div style={{display:'flex', gap:8, marginBottom:12, justifyContent:'flex-start'}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} />
        <button className="proceed-btn" onClick={add}>Add Post</button>
      </div>

      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left'}}>
            <th style={{padding:8}}>SN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p, idx) => (
            <tr key={p.id} style={{borderTop:'1px solid #eee'}}>
              <td style={{padding:8}}>{idx+1}</td>
              <td>{p.title}</td>
              <td>{p.author}</td>
              <td>
                <button className="action-btn" onClick={()=>{/* edit not implemented */}}>edit</button>
                <button className="action-btn" onClick={() => remove(p.id)} style={{color:'red'}}>delete</button>
                <button className="action-btn" onClick={() => togglePublish(p.id)} style={{color: p.published ? 'gray' : 'blue'}}>{p.published ? 'unpublish' : 'publish'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
