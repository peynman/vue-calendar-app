<template>
  <v-data-table
    v-model="internalValue"
    dense
    :headers="headers"
    :items="tasksTable"
    :show-select="showSelect"
    :single-select="singleSelect"
    item-key="id"
    class="elevation-1"
    @input="$emit('input', internalValue)"
  >
    <template v-slot:item.title="{ item }">
      <task-title-column :value="item" />
    </template>
    <template v-if="!hideActions" v-slot:item.actions="{ item }">
      <edit-remove-column :value="item" @remove="onRemoveTask(item)">
        <template v-slot:form="form">
          <task-form
            :apply-title="$t('components.taskChart.edit.apply')"
            :title="$t('components.taskChart.edit.title')"
            :value="form.item"
            @input="onUpdateTask($event)"
          />
        </template>
      </edit-remove-column>
    </template>
  </v-data-table>
</template>

<script>
  import TaskForm from './TaskForm.vue'
  import EditRemoveColumn from '../Tables/Columns/EditRemoveColumn.vue'
  import TaskTitleColumn from '../Tables/Columns/TaskTitleColumn.vue'

  export default {
    name: 'TasksTable',
    components: {
      TaskTitleColumn,
      EditRemoveColumn,
      TaskForm,
    },
    props: {
      tasks: Array,
      value: Array,
      showSelect: Boolean,
      singleSelect: Boolean,
      hideActions: Boolean,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    computed: {
      headers () {
        return [
          {
            text: 'ID',
            value: 'id',
          },
          { text: this.$t('components.table.columns.title'), value: 'title' },
          { text: this.$t('components.table.columns.actions'), value: 'actions' },
        ]
      },
      tasksTable () {
        return this.tasks
      },
    },
    methods: {
      onRemoveTask (task) {
        this.$emit('remove', task)
      },
      onUpdateTask (task) {
        this.$emit('update', task)
      },
    },
  }
</script>
