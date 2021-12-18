import { makeRandomId } from '../../../utils/helpers'

export default {
  namespaced: true,

  state: {
    tasks: [],
  },

  actions: {
    addTask (context, task) {
      return new Promise(resolve => {
        if (!task.id) {
          task.id = makeRandomId()
          task.status = 'backlog'
        }
        context.commit('addTask', task)
        resolve()
      })
    },

    removeTask (context, id) {
      return Promise.resolve(context.commit('removeTask', id))
    },

    updateTask (context, task) {
      return Promise.resolve(context.commit('updateTask', task))
    },
  },

  mutations: {
    setTasks (state, tasks) {
      state.tasks = tasks
      console.log(state.tasks)
    },

    addTask (state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },

    removeTask (state, id) {
      const index = state.tasks.map(task => task.id).indexOf(id)
      if (index >= 0) {
        state.tasks.splice(index, 1)
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
      }
    },

    updateTask (state, task) {
      const index = state.tasks.map(task => task.id).indexOf(task.id)
      console.log(index, task)
      if (index >= 0) {
        state.tasks.splice(index, 1, task)
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
      }
    },
  },

  getters: {
    tasks (state) {
      return state.tasks
    },
  },
}
