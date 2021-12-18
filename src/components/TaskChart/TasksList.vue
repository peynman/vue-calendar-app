<template>
  <v-card>
    <v-card-title>
      <span>{{ $t('components.taskChart.manage') }}</span>
      <v-spacer />
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn text small class="success" v-on="on">
            {{ $t('components.taskChart.add.title') }}
          </v-btn>
        </template>
        <task-form
          :apply-title="$t('components.taskChart.add.apply')"
          :title="$t('components.taskChart.add.title')"
          @input="onAddNewTask"
        />
      </v-dialog>
    </v-card-title>
    <v-divider />
    <v-card-text class="mt-5">
      <tasks-table
        :tasks="tasks"
        @remove="onRemoveTask"
        @update="onUpdateTask"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import TaskForm from './TaskForm.vue'
  import TasksTable from './TasksTable.vue'

  export default {
    name: 'TasksList',
    components: {
      TasksTable,
      TaskForm,
    },
    props: {
      value: Object,
    },
    data: vm => ({
      valid: false,
    }),
    computed: {
      tasks () {
        return this.$store.getters['task/tasks']
      },
    },
    methods: {
      onAddNewTask (task) {
        this.$store.dispatch('task/addTask', task)
      },
      onRemoveTask (task) {
        this.$store.dispatch('task/removeTask', task.id)
      },
      onUpdateTask (task) {
        this.$store.dispatch('task/updateTask', task)
      },
    },
  }
</script>
