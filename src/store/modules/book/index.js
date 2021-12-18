import { makeRandomId } from '../../../utils/helpers'

export default {
  namespaced: true,

  state: {
    books: [],
  },

  actions: {
    addBook (context, book) {
      return new Promise(function (resolve, reject) {
        if (!book.id) {
          book.id = makeRandomId()
        }
        context.commit('addBook', book)
        return resolve()
      })
    },
    removeBook (context, id) {
      console.log('removeBook', id)
      return Promise.resolve(context.commit('removeBook', id))
    },
    updateBook (context, book) {
      return Promise.resolve(context.commit('updateBook', book))
    },
    addBookTopic (context, { id, topic }) {
      return new Promise(function (resolve, reject) {
        if (!topic.id) {
          topic.id = makeRandomId()
        }
        context.commit('addBookTopic', { id, topic })
        return resolve()
      })
    },
    removeBookTopic (context, { bookId, topicId }) {
      return Promise.resolve(context.commit('removeBookTopic', { bookId, topicId }))
    },
    setBookTopics (context, { bookId, topics }) {
      return Promise.resolve(context.commit('setBookTopics', { bookId, topics }))
    },
  },

  mutations: {
    setBooks (state, books) {
      state.books = books ?? []
    },

    addBook (state, book) {
      state.books.push(book)
      localStorage.setItem('books', JSON.stringify(state.books))
    },
    removeBook (state, id) {
      const index = state.books.findIndex(b => { console.log(b.id); return b.id === id })
      if (index >= 0) {
        state.books.splice(index, 1)
        localStorage.setItem('books', JSON.stringify(state.books))
      }
    },
    updateBook (state, book) {
      const index = state.books.findIndex(b => b.id === book.id)
      if (index >= 0) {
        state.books[index] = book
        localStorage.setItem('books', JSON.stringify(state.books))
      }
    },
    addBookTopic (state, { id, topic }) {
      const index = state.books.findIndex(b => b.id === id)
      if (index >= 0) {
        if (!state.books[index].topics) {
          state.books[index].topics = []
        }
        state.books[index].topics.push(topic)
        localStorage.setItem('books', JSON.stringify(state.books))
      }
    },
    removeBookTopic (state, { bookId, topicId }) {
      const index = state.books.findIndex(b => b.id === bookId)
      if (index >= 0) {
        const ti = state.books[index].topics?.findIndex(t => t.id === topicId)
        if (ti) {
          state.books[index].topics.splice(ti, 1)
          localStorage.setItem('books', JSON.stringify(state.books))
        }
      }
    },
    setBookTopics (state, { bookId, topics }) {
      const index = state.books.findIndex(b => b.id === bookId)
      if (index >= 0) {
        console.log(topics)
        state.books[index].topics = topics?.map(t => ({
          id: makeRandomId(),
          ...t,
        }))
        localStorage.setItem('books', JSON.stringify(state.books))
    }
    },
    updateBookTopic (state, { bookId, topic }) {
      const index = state.books.findIndex(b => b.id === bookId)
      if (index >= 0) {
        const ti = state.books[index].topics?.findIndex(t => t.id === topic.id)
        if (ti) {
          state.books[index].topics[ti] = topic
          localStorage.setItem('books', JSON.stringify(state.books))
        }
      }
    },
  },

  getters: {
    books (state) {
      return state.books
    },
  },
}
