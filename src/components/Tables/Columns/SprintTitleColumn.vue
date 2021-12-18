<template>
  <div class="d-flex flex-column my-2">
    <span>{{ title }}</span>
    <div class="d-flex flex-row">
      <v-chip dense x-small label dark :color="color">
        {{ sprintDuration }}
      </v-chip>
    </div>
  </div>
</template>

<script>
  import DateFormatters from '../../../mixins/DateFormatters'

  export default {
    name: 'SprintTitleColumn',
    mixins: [
      DateFormatters,
    ],
    props: {
      value: Object,
    },
    computed: {
      title () {
        return this.value?.title
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
  }
</script>
