<template>
  <div class="d-flex flex-row">
    <v-chip x-small dense label>
      {{ tasksCount }}
    </v-chip>
  </div>
</template>

<script>
  export default {
    name: 'SprintTasksColumn',
    props: {
      value: Object,
    },
    computed: {
      tasksCount () {
        return this.$n(this.value?.tasks?.length ?? 0, 'decimal')
      },
    },
  }
</script>
