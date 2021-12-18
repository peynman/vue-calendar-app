import { makeRandomId } from '../../../utils/helpers'

export default {
  namespaced: true,

  state: {
    sprints: [],
  },

  actions: {
    addSprint (context, sprint) {
      return new Promise(resolve => {
        if (!sprint.id) {
          sprint.id = makeRandomId()
        }
        context.commit('addSprint', sprint)
        resolve()
      })
    },
    removeSprint (context, id) {
      return Promise.resolve(context.commit('removeSprint', id))
    },
  },

  mutations: {
    setSprints (state, sprints) {
      state.sprints = sprints?.map(s => ({
        ...s,
        between: [
          new Date(Date.parse(s.between?.[0])),
          new Date(Date.parse(s.between?.[1])),
        ],
      }))
      console.log(state.sprints)
    },
    addSprint (state, sprint) {
      state.sprints.push(sprint)
      localStorage.setItem('sprints', JSON.stringify(state.sprints))
    },
    removeSprint (state, id) {
      const index = state.sprints.findIndex(s => s.id === id)
      if (index >= 0) {
        state.sprints.splice(index, 1)
        localStorage.setItem('sprints', JSON.stringify(state.sprints))
      }
    },
  },

  getters: {
    sprints (state) {
      return state.sprints
    },

    activeSprints (state) {
      const now = (new Date()).getTime() / 86400000
      return state.sprints
        ?.filter(
          s => now >= Math.floor(s.between?.[0]?.getTime() / 86400000) && now <= Math.floor(s.between?.[1].getTime() / 86400)
        )
    },

    activeSprint (state, getters) {
      return getters.activeSprints?.[0]
    },
  },
}
