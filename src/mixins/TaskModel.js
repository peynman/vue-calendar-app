export default {
  computed: {
    task () {
      return this.value
    },
    taskTitle () {
      return this.task?.title
    },
    taskColor () {
      return this.task?.color
    },
    taskStatus () {
      return this.task?.status
    },
    taskColumn () {
      return this.task?.column
    },
    taskTypeString () {
      return this.$t('components.taskChart.types.' + this.task?.type)
    },
    taskPriorityString () {
      return this.$t('components.taskChart.priorities.' + this.task?.priority)
    },
    taskStatusString () {
      return this.task?.status
    },
    taskDifficultyString () {
      return this.$n(this.task?.difficulty, 'decimal')
    },
    taskDifficultyColor () {
      if (this.task?.difficulty <= 3) {
        return 'green'
      } else if (this.task?.difficulty <= 6) {
        return 'green darken-2'
      } else if (this.task?.difficulty <= 8) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    taskBooks () {
      return this.$store.getters['book/books']?.filter(b => this.task?.books?.includes(b.id))
    },
    taskTopics () {
      return this.taskBooks?.reduce((topics, b) => {
        topics.push(...b.topics?.filter(t => this.task?.topics?.includes(t.id)))
        return topics
      }, [])
    },
    taskMintuesString () {
      return this.$t('components.taskChart.minutes', [
        this.$n(this.task?.minutes, 'decimal'),
      ])
    },
  },
}
