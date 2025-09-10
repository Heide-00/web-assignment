import { useState } from 'react'
import { User } from 'src/types/User'

interface Props {
  onAdd: (user: User) => void
}

export default function UserForm({ onAdd }: Props) {
  const [form, setForm] = useState<Omit<User, 'id'>>({
    name: '',
    username: '',
    email: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: User = {
      id: Date.now(), // mock id
      ...form
    }
    onAdd(newUser)
    setForm({ name: '', username: '', email: '' }) // formu sıfırla
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Ad Soyad"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Kullanıcı Adı"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="E-posta"
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Kaydet
      </button>
    </form>
  )
}


