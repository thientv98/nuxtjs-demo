export const state = () => ({
  count: 0,
  middleware: false
})

export const getters = {
  count(state) {
    return state.count
  },
  middleware(state) {
    return state.middleware
  }
}

export const mutations = {
  updateCount (state, data) {
    state.count = data
  },
}

export const actions = {
  inCrementCount({ commit, state }){
    commit('updateCount', state.count + 1)
  },
}
