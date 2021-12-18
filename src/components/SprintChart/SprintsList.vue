<template>
  <v-card>
    <v-card-title>
      <span>{{ $t('components.sprintChart.manage') }}</span>
      <v-spacer />
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn text small class="success" v-on="on">
            {{ $t('components.sprintChart.add.title') }}
          </v-btn>
        </template>
        <sprint-form
          :apply-title="$t('components.sprintChart.add.apply')"
          :title="$t('components.sprintChart.add.title')"
          @input="onAddNewSprint"
        />
      </v-dialog>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-data-table
        dense
        :headers="headers"
        :items="sprints"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.title="{ item }">
          <sprint-title-column :value="item" />
        </template>
        <template v-slot:item.tasks="{ item }">
          <sprint-tasks-column :value="item" />
        </template>
        <template v-slot:item.actions="{ item }">
          <edit-remove-column :value="item" @remove="onRemoveSprint(item)">
            <template v-slot:form="form">
              <sprint-form
                :apply-title="$t('components.sprintChart.edit.apply')"
                :title="$t('components.sprintChart.edit.title')"
                :value="form.item"
                @input="onUpdateSprint($event)"
              />
            </template>
          </edit-remove-column>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import SprintForm from '../SprintChart/SprintForm.vue'
  import EditRemoveColumn from '../Tables/Columns/EditRemoveColumn.vue'
  import SprintTasksColumn from '../Tables/Columns/SprintTasksColumn.vue'
  import SprintTitleColumn from '../Tables/Columns/SprintTitleColumn.vue'

  export default {
    name: 'SprintList',
    components: {
      SprintForm,
      EditRemoveColumn,
      SprintTitleColumn,
      SprintTasksColumn,
    },
    props: {
      value: Object,
    },
    data: vm => ({
      valid: false,
    }),
    computed: {
      sprints () {
        return this.$store.getters['sprint/sprints']
      },
      headers () {
        return [
          {
            text: 'ID',
            value: 'id',
          },
          { text: this.$t('components.table.columns.title'), value: 'title' },
          { text: this.$t('components.table.columns.tasksCount'), value: 'tasks' },
          { text: this.$t('components.table.columns.actions'), value: 'actions' },
        ]
      },
    },
    methods: {
      onAddNewSprint (sprint) {
        this.$store.dispatch('sprint/addSprint', sprint)
      },
      onRemoveSprint (sprint) {
        this.$store.dispatch('sprint/removeSprint', sprint.id)
      },
      onUpdateSprint (sprint) {
        this.$store.dispatch('sprint/removeSprint', sprint.id)
        this.$nextTick(() => {
          this.$store.dispatch('sprint/addSprint', sprint)
        })
      },
    },
  }
</script>
