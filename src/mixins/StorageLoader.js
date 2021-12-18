export default {
  methods: {
    getStorageObject (name) {
      const objectStr = localStorage.getItem(name)
      if (objectStr) {
        try {
          const object = JSON.parse(objectStr)
          return object
        } catch (e) {
          console.error(e)
        }
      }

      return null
    },
  },
}
