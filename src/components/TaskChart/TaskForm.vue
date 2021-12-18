<template>
  <v-card>
    <v-card-title>
      <span>{{ title }}</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="mt-2">
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="internalValue.title"
              :label="$t('components.taskChart.labels.title')"
              :rules="[ getRequiredRule() ]"
            />
            <v-text-field
              v-model="internalValue.minutes"
              :label="$t('components.taskChart.labels.estimatedMinutes')"
              type="number"
            />
            <v-color-picker-input
              v-model="internalValue.color"
              :label="$t('components.taskChart.labels.color')"
              :rules="[ getRequiredRule() ]"
            />
            <v-autocomplete
              v-model="internalValue.books"
              :items="books"
              :label="$t('components.taskChart.labels.books')"
              multiple
              chips
              clearable
              small-chips
              deletable-chips
              @input="onUpdateColor"
            />
            <v-autocomplete
              v-model="internalValue.topics"
              :items="selectedBookTopicsList"
              :label="$t('components.taskChart.labels.topics')"
              multiple
              chips
              clearable
              small-chips
              deletable-chips
            />
          </v-col>
          <v-col cols="12" sm="6">
            <task-priority-input v-model="internalValue.priority" />
            <task-type-input v-model="internalValue.type" />
            <v-slider
              v-model="internalValue.difficulty"
              :label="$t('components.taskChart.labels.difficulty')"
              max="10"
              thumb-label="always"
              mix="1"
              class="mt-10"
            />
            <v-text-field
              v-model="internalValue.sprint"
              :label="$t('components.taskChart.labels.sprint')"
            />
            <task-status-input v-model="internalValue.status" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="primary" @click="onApply">{{ applyTitle }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { Mixins } from 'paas_admin/dist/paas_admin.umd'
  import TaskTypeInput from './TaskTypeInput.vue'
  import TaskStatusInput from './TaskStatusInput.vue'
  import TaskPriorityInput from './TaskPriorityInput.vue'

  export default {
    name: 'TaskForm',
    components: { TaskTypeInput, TaskStatusInput, TaskPriorityInput },
    mixins: [
      Mixins.FormValidations.default(),
    ],
    props: {
      title: String,
      applyTitle: String,
      value: Object,
    },
    data: vm => ({
      valid: false,
      internalValue: { ...(vm.value ?? {}) },
    }),
    computed: {
      books () {
        return this.$store.getters['book/books'].map(b => ({
          text: '#' + b.id + ' ' + b.title,
          value: b.id,
        }))
      },
      selectedBooks () {
        return this.$store.getters['book/books']
          .filter(b => this.internalValue?.books?.includes(b.id))
      },
      selectedBookTopicsList () {
        return this.selectedBooks?.reduce((topics, b) => {
          topics.push(...b.topics)
          return topics
        }, []).map(t => ({
          text: '#' + t.index + ' ' + t.title,
          value: t.id,
        }))
      },
    },
    methods: {
      onApply () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', { ...this.internalValue })
        }
      },
      onUpdateColor () {
        if (this.selectedBooks?.[0]?.color) {
          this.internalValue.color = this.selectedBooks[0].color
        }
      },
    },
  }
</script>
