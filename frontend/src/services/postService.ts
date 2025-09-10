import { Post } from 'src/types/Post'


export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Post verisi alınamadı')
  return res.json()
}


export async function fetchPostsFromBackend(): Promise<Post[]> {
  const res = await fetch('http://localhost:3000/posts')
  if (!res.ok) throw new Error('Backend post verisi alınamadı')
  return res.json()
}


export function createPost(newPost: Post, currentPosts: Post[]): Post[] {
  return [...currentPosts, newPost]
}


export async function createPostToBackend(newPost: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  })
  if (!res.ok) throw new Error('Post eklenemedi')
  return res.json()
}

export function deletePost(id: number, currentPosts: Post[]): Post[] {
  return currentPosts.filter(post => post.id !== id)
}


export async function deletePostFromBackend(id: number): Promise<void> {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Post silinemedi')
}


export function updatePost(updatedPost: Post, currentPosts: Post[]): Post[] {
  return currentPosts.map(post =>
    post.id === updatedPost.id ? updatedPost : post
  )
}

export async function updatePostToBackend(updatedPost: Post): Promise<Post> {
  const res = await fetch(`http://localhost:3000/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  })
  if (!res.ok) throw new Error('Post güncellenemedi')
  return res.json()
}