export const state = () => ({
  busy: false,
  loggedIn: false,
  stategy: "local",
  user: false
})

export const getters = {
  authenticated(state) {
    return state.auth.loggedIn
  },

  user(state) {
    return state.auth.user
  }
}

export const mutations = {
  updateUser (state, data) {
    state.user = data
  },
}

export const actions = {
  setUser({ commit }, user){
    commit('updateUser', user)
  },
}
