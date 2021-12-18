<template>
  <v-card>
    <v-card-title>
      <span>{{ title }}</span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="internalValue.title"
          :label="$t('components.sprintChart.labels.title')"
          :rules="[ getRequiredRule() ]"
        />
        <v-color-picker-input
          v-model="internalValue.color"
          :label="$t('components.sprintChart.labels.color')"
          :rules="[ getRequiredRule() ]"
        />
        <v-timestamp-input
          v-model="internalValue.between"
          :label="$t('components.sprintChart.labels.between')"
          :rules="[ getRequiredRule() ]"
          range
        />
        <v-text-field
          v-model="internalValue.description"
          :label="$t('components.sprintChart.labels.description')"
        />
        <v-autocomplete
          v-model="internalValue.tasks"
          :label="$t('components.sprintChart.labels.tasks')"
          :items="avTasks"
          multiple
          small-chips
          chips
          deletable-chips
          clearable
        />
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

  export default {
    name: 'SprintForm',
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
      avTasks () {
        return this.$store.getters['task/tasks']
          .filter(t => t.status === 'backlog')
          .map(t => ({
            text: t.title,
            value: t.id,
          }))
      },
    },
    methods: {
      onApply () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
