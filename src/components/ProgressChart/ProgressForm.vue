<template>
  <v-card>
    <v-card-title>
      <span>{{ formTitle }}</span>
    </v-card-title>
    <v-card-subtitle>
      <span class="text-normalize caption">{{ sprintTitle }}</span>
    </v-card-subtitle>
    <v-card-text>
      <v-form>
        <kanboard
          :value="value"
          :sprint="sprint"
          :time="time"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import Kanboard from '../Kanboard/Kanboard.vue'
  import DateFormatters from '../../mixins/DateFormatters'

  export default {
    name: 'ProgressForm',
    components: { Kanboard },
    mixins: [
      DateFormatters,
    ],
    props: {
      time: Date,
      value: Array,
      sprint: Object,
    },
    computed: {
      sprintTitle () {
        return this.sprint?.title
      },
      formTitle () {
        return this.$t('components.progressChart.form.edit', [
          this.dateFormatter.format(this.time),
        ])
      },
    },
  }
</script>
