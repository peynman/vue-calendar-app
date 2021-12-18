<template>
  <calendar-app>
    <template v-slot:toolbar>
      <calendar-toolbar v-model="tab" />
    </template>
    <calendar-toolbar-tabs v-model="tab" />
  </calendar-app>
</template>

<script>
  import CalendarApp from '../templates/CalendarApp/CalendarApp.vue'
  import CalendarToolbar from '../../components/CalendarApp/CalendarToolbar.vue'
  import StorageLoader from '../../mixins/StorageLoader'
  import CalendarToolbarTabs from '../../components/CalendarApp/CalendarToolbarTabs.vue'
  import { makeRandomId } from '../../utils/helpers'

  export default {
    name: 'Desktop',
    components: {
      CalendarApp,
      CalendarToolbar,
      CalendarToolbarTabs,
    },
    mixins: [
      StorageLoader,
    ],
    data: vm => ({
      tab: 0,
    }),
    computed: {
      sprint () {
        return this.$store.getters['sprint/activeSprint']
      },
    },
    mounted () {
      this.$store.commit('book/setBooks', this.getStorageObject('books'))

      const fixed = this.$store.getters['book/books']?.map(b => ({
        ...b,
        topics: b.topics?.map(t => ({ id: makeRandomId(), ...t })),
      }))
      console.log(fixed)

      this.$store.commit('sprint/setSprints', this.getStorageObject('sprints'))
      this.$store.commit('task/setTasks', this.getStorageObject('tasks'))
    },
  }
</script>
