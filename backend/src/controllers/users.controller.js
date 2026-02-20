let users = []
let idCounter = 1

export const getAllUsers = (req, res) => {
  res.json(users)
}
export const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
}
export const createUser = (req, res) => {
  const { name } = req.body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Valid name required' })
  }

  const newUser = {
    id: idCounter++,
    name: name.trim()
  }

  users.push(newUser)

  res.status(201).json(newUser)
}

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Valid name required' })
  }

  user.name = name.trim()

  res.json(user)
}

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' })
  }

  users.splice(userIndex, 1)

  res.json({ message: 'User deleted successfully' })
}