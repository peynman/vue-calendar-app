<template>
  <v-card color="info lighten-4">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          <v-tooltip top>
            <template v-slot:activator="tooltip">
              <v-dialog max-width="766">
                <template v-slot:activator="{on}">
                  <v-btn icon small v-on="{ ...on, ...tooltip.on }">
                    <v-icon small>mdi-table-column-plus-before</v-icon>
                  </v-btn>
                </template>
                <tasks-list />
              </v-dialog>
            </template>
            {{ $t('components.taskChart.add.title') }}
          </v-tooltip>
          <span class="text-normalize">
            {{ $t('components.taskChart.title') }}
          </span>
        </div>
        <v-list-item-title class="text-h5 mb-1" />
        <v-list-item-subtitle>
          <span>
            {{ taskSummeries }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  import TasksList from './TasksList.vue'

  export default {
    name: 'TaskChart',
    components: {
      TasksList,
    },
    computed: {
      backlogTasks () {
        return this.$store.getters['task/tasks'].filter(t => t.status === 'backlog') ?? []
      },
      sprintTasks () {
        return this.$store.getters['task/tasks'].filter(t => t.status === 'sprint') ?? []
      },
      hangedTasks () {
        return this.$store.getters['task/tasks'].filter(t => t.status === 'hanged') ?? []
      },
      runningTasks () {
        return this.$store.getters['task/tasks'].filter(t => t.status === 'running') ?? []
      },
      doneTasks () {
        return this.$store.getters['task/tasks'].filter(t => t.status === 'done') ?? []
      },
      taskSummeries () {
        return this.$t('components.taskChart.summary', [
          this.$n(this.backlogTasks.length, 'decimal'),
          this.$n(this.runningTasks.length, 'decimal'),
          this.$n(this.backlogTasks.length - this.doneTasks.length, 'decimal'),
        ])
      },
    },
  }
</script>
