<template>
  <v-card>
    <v-card-title>
      {{ $t('components.kanboard.taskSelect.title') }}
      <v-spacer />
      <v-dialog v-if="showAddForm" max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon color="green" v-on="on">
            <v-icon small>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <task-form
          :apply-title="$t('components.taskChart.add.apply')"
          :title="$t('components.taskChart.add.title')"
          @input="onAddNewTask"
        />
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <tasks-table v-model="internalValue" :tasks="tasks" hide-actions show-select />
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="onApplySelected">{{ $t('components.kanboard.taskSelect.apply') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import TaskForm from '../TaskChart/TaskForm.vue'
  import TasksTable from '../TaskChart/TasksTable.vue'
  export default {
    name: 'TasksSelectForm',
    components: { TasksTable, TaskForm },
    props: {
      value: Array,
      showAddForm: Boolean,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    computed: {
      tasks () {
        return this.$store.getters['task/tasks'].filter(t => t.status === 'backlog')
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onApplySelected () {
        this.$emit('input', this.internalValue)
      },
      onAddNewTask (task) {
        this.$store.dispatch('task/addTask', task)
      },
    },
  }
</script>
