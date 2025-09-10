import { useEffect, useState } from 'react'
import { fetchUsers } from 'src/services/userService'
import { User } from 'src/types/User'
import UserForm from './UserForm'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '' })

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  const handleAdd = (newUser: User) => {
    setUsers(prev => [...prev, newUser])
  }

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    const updatedUser: User = {
      ...editingUser,
      ...editForm
    }
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user))
    setEditingUser(null)
    setEditForm({ name: '', username: '', email: '' })
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>

      <UserForm onAdd={handleAdd} />

      <ul className="space-y-2 mt-6">
        {users.map(user => (
          <li key={user.id} className="border p-3 rounded shadow-sm">
            {editingUser?.id === user.id ? (
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <input
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Name"
                  className="border p-1 w-full"
                />
                <input
                  value={editForm.username}
                  onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                  placeholder="Username"
                  className="border p-1 w-full"
                />
                <input
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="Email"
                  className="border p-1 w-full"
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Kaydet</button>
                  <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-300 px-3 py-1 rounded">İptal</button>
                </div>
              </form>
            ) : (
              <>
                <p><strong>{user.name}</strong> <span className="text-sm text-gray-500">({user.username})</span></p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingUser(user)
                      setEditForm({ name: user.name, username: user.username, email: user.email })
                    }}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}


