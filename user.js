const users = [
  {
    id: '1',
    name: 'User One',
    username: 'user_1',
    password: '1234'
  },
  {
    id: '2',
    name: 'User Two',
    username: 'user_2',
    password: '4321'
  }
]

const findUserById = (id) => {
  return users.find(user => user.id === id)
}

const findUserByUsername = (username) => {
  return users.find(user => user.username === username)
}

module.exports = {findUserById, findUserByUsername}