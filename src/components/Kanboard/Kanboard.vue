<template>
  <v-expansion-panels multiple>
    <v-expansion-panel
      v-for="(c, ci) in columns"
      :key="`col-${ci}`"
      cols="4"
    >
      <v-expansion-panel-header>
        <v-card
          :color="c.color"
          dark
          class="mx-1"
        >
          <v-card-title class="py-1 px-3">
            <span>{{ c.title }}</span>
            <v-spacer />
            <v-chip label dense small color="transparent">
              {{ c.countString }}
            </v-chip>
            <v-chip label dense small color="transparent">
              {{ c.minutesString }}
            </v-chip>
            <div v-if="ci === 0">
              <v-dialog max-width="766">
                <template v-slot:activator="{on}">
                  <v-btn icon small v-on="on">
                    <v-icon small>mdi-clipboard-list</v-icon>
                  </v-btn>
                </template>
                <task-select-form show-add-form @input="onNewTask" />
              </v-dialog>
            </div>
          </v-card-title>
        </v-card>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <div
            v-for="(t, ti) in getColumnTasks(c.key)"
            :key="`col-${ci}-${ti}`"
            :ondrop="onDrop"
            class="d-flex flex-column"
          >
            <item-card
              :value="t"
              @remove="onRemoveTask"
              @update="onUpdateTask"
              @up="onMoveTaskColumnUp"
              @down="onMoveTaskColumnDown"
            />
            <v-divider />
          </div>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  import TaskSelectForm from './TaskSelectForm.vue'
  import ItemCard from './TaskItemCard.vue'

  export default {
    name: 'Kanboard',
    components: {
      TaskSelectForm,
      ItemCard,
    },
    props: {
      time: Date,
      sprint: Object,
      customColumns: Array,
      value: Array,
    },
    computed: {
      columns () {
        return this.customColumns ?? Object.keys(this.$t('components.kanboard.columns')).map((k, ki) => ({
          title: this.$t('components.kanboard.columns.' + k),
          color: ['secondary', 'primary', 'success'][ki],
          index: ki + 1,
          key: k,
          minutesString: this.getColumnTasksMinutesString(k),
          countString: this.getColumnTasksCountString(k),
        }))
      },
      tasks () {
        return this.$store.getters['task/tasks']
          .filter(t => t.date === Math.floor(this.time.getTime() / 86400000))
      },
    },
    methods: {
      getColumnTasks (col) {
        return this.tasks?.filter(t => t.column === col)
      },
      getColumnTasksCountString (col) {
        return this.$n(this.getColumnTasks(col)?.length, 'decimal')
      },
      getColumnTasksMinutesString (col) {
        if (col === 'done') {
          return this.$t('components.taskChart.minutes', [
            this.$n(this.getColumnTasks(col)?.reduce((acc, t) => parseInt(t.runningTime ?? 0) + acc, 0), 'decimal'),
          ])
        }
        return this.$t('components.taskChart.minutes', [
          this.$n(this.getColumnTasks(col)?.reduce((acc, t) => parseInt(t.minutes ?? 0) + acc, 0), 'decimal'),
        ])
      },
      onNewTask (tasks) {
        tasks.forEach(t => {
          t.status = 'sprint'
          t.column = 'todo'
          t.sprint = this.sprint?.id
          t.date = Math.floor(this.time.getTime() / 86400000)
          if (t.id) {
            this.$store.dispatch('task/updateTask', t)
          } else {
            this.$store.dispatch('task/addTask', t)
          }
        })
      },
      onRemoveTask (task) {
        task.status = 'backlog'
        task.sprint = null
        task.date = null
        this.$store.commit('task/updateTask', task)
      },
      onUpdateTask (task) {
        console.log('update', task)
        this.$store.commit('task/updateTask', task)
      },
      onMoveTaskColumnUp (task) {
        if (task.column === 'running') {
          task.column = 'todo'
        } else if (task.column === 'done') {
          task.column = 'running'
        }
        this.$store.commit('task/updateTask', task)
      },
      onMoveTaskColumnDown (task) {
        if (task.column === 'running') {
          task.column = 'done'
        } else if (task.column === 'todo') {
          task.column = 'running'
        } else {
          task.column = 'todo'
        }
        this.$store.commit('task/updateTask', task)
      },
      onDrop (c) {
        console.log(c)
      },
    },
  }
</script>
