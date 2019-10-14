import axios from 'axios'

const state = {
  users: []
}

const getters = {
  allUsers: (state) => state.users
}

const actions = {
  async fetchUsers({commit}, page) {
    // console.log('fetchUsers', page)
    let response
    if (page){
      response = await axios.get('https://reqres.in/api/users?page='+page)
    } else{
      response = await axios.get('https://reqres.in/api/users?page=1')
    }
    commit('setUsers', response.data)
    // console.log('fetch users response', response.data)
  },
  async addUser({commit}, user){
    const response = await axios.post('https://reqres.in/api/users', user )
    console.log('add user response', response.data)
    
    commit ('newUser', response.data)
  },
  async deleteUser({commit}, id) {
    const response = await axios.delete('https://reqres.in/api/users/'+id)
    console.log('delete user response' , response)
    commit('removeUser', id)
  },
  async updateUser({commit}, updUser) {
    const response = await axios.put('https://reqres.in/api/users/' + updUser.id, {id: updUser.id, first_name: updUser.first_name, last_name: updUser.last_name, avatar: updUser.avatar})
    console.log('update user', response)
    commit('updateUser', updUser)
  }

}

const mutations = {
  setUsers: (state, users) => {state.users = users},
  newUser: (state, user) => {if(state.users.data) state.users.data.unshift(user)},
  removeUser: (state, id) => state.users.data = state.users.data.filter( user => user.id !== id),
  updateUser: (state, updUser) => {
    const index = state.users.data.findIndex( user => user.id === updUser.id)

    if (index !== -1) {
      state.users.data.splice(index, 1, updUser)
    }
  }
  
}

export default {
  state, 
  getters,
  actions, 
  mutations
}