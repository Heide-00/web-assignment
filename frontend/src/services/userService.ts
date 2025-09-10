import { User } from 'src/types/User'


export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Kullanıcı verisi alınamadı')
  return res.json()
}

export function createUser(newUser: User, currentUsers: User[]): User[] {
  return [...currentUsers, newUser]
}

export function deleteUser(id: number, currentUsers: User[]): User[] {
  return currentUsers.filter(user => user.id !== id)
}


export function updateUser(updatedUser: User, currentUsers: User[]): User[] {
  return currentUsers.map(user =>
    user.id === updatedUser.id ? updatedUser : user
  )
}