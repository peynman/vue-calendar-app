<template>
  <v-list-item dense two-line>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle>
        <v-chip label dense small :color="color" dark>
          {{ sprintDuration }}
        </v-chip>
      </v-list-item-subtitle>
      <v-list-item-title>{{ description }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <sprint-form
          :apply-title="$t('components.sprintChart.edit.apply')"
          :title="$t('components.sprintChart.edit.title')"
          :value="value"
          @input="onEditSprint"
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
  import SprintForm from './SprintForm.vue'
  import { Components } from 'paas_admin/dist/paas_admin.umd'

  export default {
    name: 'SprintListItem',
    components: {
      SprintForm,
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
      title () {
        return this.value?.title ?? ''
      },
      description () {
        return this.value?.description ?? ''
      },
      color () {
        return this.value?.color ?? 'secondary'
      },
      sprintStartDate () {
        return this.dateFormatter.format(this.value.between[0])
      },
      sprintDuration () {
        return this.$t('components.sprintChart.sprintDetails', [
          this.sprintStartDate,
          Math.floor((this.value.between?.[1]?.getTime() - this.value.between?.[0]?.getTime()) / 86400000),
        ])
      },
    },
    methods: {
      onRemove () {
        this.$emit('remove')
      },
      onEditSprint (sprint) {
        this.$emit('update', sprint)
      },
    },
  }
</script>
