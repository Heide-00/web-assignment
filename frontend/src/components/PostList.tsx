import { useEffect, useState } from 'react';
import { fetchPosts } from 'src/services/postService';
import { fetchUsers } from 'src/services/userService';
import { Post } from 'src/types/Post';
import { User } from 'src/types/User';
import PostForm from './PostForm';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  const handleAddPost = (newPost: Post) => {
    setPosts(prev => [...prev, newPost]);
  };


  const handleDeletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(prev =>
      prev.map(post => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingId(null);
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        const [postData, userData] = await Promise.all([
          fetchPosts(),
          fetchUsers(),
        ]);
        setPosts(postData);
        setUsers(userData);
      } catch /*(err)*/{
        setError('Veriler alınırken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Post List</h2>

    
      {isLoading && <p className="text-gray-500">Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}

     
      <PostForm onAdd={handleAddPost} />

    
      <ul className="space-y-2 mt-6">
        {posts.map(({ id, userId, title }) => {
          const author = users.find(u => u.id === userId);
          const isEditing = editingId === id;

          return (
            <li key={id} className="border p-3 rounded shadow-sm">
              {isEditing ? (
                <PostForm
                  initialData={{ id, title, userId }}
                  onUpdate={handleUpdatePost}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <p><strong>{title}</strong></p>
                  <p className="text-sm text-gray-600">
                    Yazan: {author ? `${author.name} (${author.username})` : `Kullanıcı ID: ${userId}`}
                  </p>

                  <button
                    onClick={() => handleDeletePost(id)}
                    className="mt-2 mr-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Sil
                  </button>

                  <button
                    onClick={() => setEditingId(id)}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Düzenle
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}




