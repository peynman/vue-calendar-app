<template>
  <v-list-item dense two-line>
    <v-list-item-content>
      <v-list-item-title>{{ taskTitle }}</v-list-item-title>
      <v-list-item-subtitle>
        <v-chip label dense small :color="taskColor" dark>
          {{ taskType }}
        </v-chip>
        <v-chip
          class="mx-1"
          label
          dense
          small
          :color="taskColor"
          dark
        >
          {{ taskPriority }}
        </v-chip>
      </v-list-item-subtitle>
      <v-list-item-title>{{ taskDescription }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <task-form
          :apply-title="$t('components.taskChart.edit.apply')"
          :title="$t('components.taskChart.edit.title')"
          :value="value"
          @input="onEditTask"
        />
      </v-dialog>
      <confirm-remove-dialog v-if="!hideRemove" @remove="onRemove">
        <template v-slot:activator="{on}">
          <v-btn icon color="red" v-on="on"><v-icon small>mdi-database-remove</v-icon></v-btn>
        </template>
      </confirm-remove-dialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import DateFormatters from '../../mixins/DateFormatters'
  import TaskForm from './TaskForm.vue'
  import { Components } from 'paas_admin/dist/paas_admin.umd'

  export default {
    name: 'TaskListItem',
    components: {
      TaskForm,
      ConfirmRemoveDialog: Components.Inputs.ConfirmDialog.ConfirmRemoveDialog.default,
    },
    mixins: [
      DateFormatters,
    ],
    props: {
      value: Object,
      hideRemove: Boolean,
    },
    computed: {
      taskTitle () {
        return this.value?.title ?? ''
      },
      taskDescription () {
        return this.value?.description ?? ''
      },
      taskColor () {
        return this.value?.color ?? 'secondary'
      },
      taskPriority () {
        return this.$t('components.taskChart.priorities.' + this.value?.priority ?? '')
      },
      taskType () {
        return this.$t('components.taskChart.types.' + this.value?.type ?? '')
      },
    },
    methods: {
      onRemove () {
        this.$emit('remove')
      },
      onEditTask (task) {
        this.$emit('update', task)
      },
    },
  }
</script>
