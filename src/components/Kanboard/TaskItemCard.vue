<template>
  <v-list-item draggable>
    <v-list-item-avatar class="d-flex flex-column">
      <v-icon :disabled="task.column === 'todo'" @click="onMoveUp">mdi-chevron-up</v-icon>
      <v-icon @click="onMoveDown">mdi-chevron-down</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <span class="caption">{{ taskTitle }}</span>
      <v-list-item-subtitle class="d-flex flex-row align-center">
        <v-chip
          dark
          dense
          small
          label
          :color="taskDifficultyColor"
          class="me-1"
        >
          <span class="caption me-1">{{ taskDifficultyString }}</span>
          <v-icon small>mdi-rocket-outline</v-icon>
        </v-chip>
        <v-chip dense dark small label :color="taskColor">{{ taskMintuesString }}</v-chip>
      </v-list-item-subtitle>
      <v-list-item-subtitle class="d-flex flex-row">
        <div v-for="(book, bi) in taskBooks" :key="`book-${bi}`" class="d-flex flex-row">
          <v-chip
            dark
            dense
            x-small
            label
            :color="book.color"
            class="me-1"
          >{{ book.title }}</v-chip>
        </div>
        <div v-for="(topic, ti) in taskTopics" :key="`topic-${ti}`" class="d-flex flex-row">
          <v-chip
            dark
            dense
            x-small
            label
            class="me-1"
          >{{ topic.title }}</v-chip>
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <task-item-timer
        v-model="counter"
        :auto-start="shouldCount"
        :status="taskColumn"
      />
    </v-list-item-action>
    <v-list-item-action>
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon small v-on="on">
            <v-icon small>mdi-calendar-edit</v-icon>
          </v-btn>
        </template>
        <task-form
          :value="value"
          :apply-title="$t('components.taskChart.edit.apply')"
          :title="$t('components.taskChart.edit.title')"
          @input="onUpdate"
        />
      </v-dialog>
      <confirm-remove-dialog @remove="onRemove">
        <template v-slot:activator="{on}">
          <v-btn small icon color="red" v-on="on">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </template>
      </confirm-remove-dialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import { Components } from 'paas_admin/dist/paas_admin.umd'
  import TaskForm from '../TaskChart/TaskForm.vue'
  import TaskModel from '../../mixins/TaskModel'
  import TaskItemTimer from './TaskItemTimer.vue'

  export default {
    name: 'TaskItemCard',
    components: {
      ConfirmRemoveDialog: Components.Inputs.ConfirmDialog.ConfirmRemoveDialog.default,
      TaskForm,
      TaskItemTimer,
    },
    mixins: [
      TaskModel,
    ],
    props: {
      value: Object,
    },
    data: vm => ({
      counter: vm.value?.runningTime,
    }),
    computed: {
      showCounter () {
        return this.task?.column === 'running' || this.task?.column === 'done'
      },
      shouldCount () {
        return this.task?.column === 'running'
      },
    },
    watch: {
      value () {
        this.counter = this.value?.runningTime ?? 0
      },
    },
    methods: {
      onRemove () {
        this.value.runningTime = this.counter
      },
      onUpdate (task) {
        console.log(task)
        this.$emit('update', task)
      },
      onMoveDown () {
        this.value.runningTime = this.counter
        this.$emit('down', this.value, this.counter)
      },
      onMoveUp () {
        this.value.runningTime = this.counter
        this.$emit('up', this.value, this.counter)
      },
    },
  }
</script>
