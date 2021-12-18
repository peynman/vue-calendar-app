<template>
  <v-dialog max-width="766">
    <template v-slot:activator="onDialog">
      <v-tooltip top :color="sprintColor">
        <template v-slot:activator="{on}">
          <v-chip
            v-bind="chipProps"
            label
            :class="`me-1 mt-1 ${chipClass}`"
            :style="chipStyles"
            tag="div"
            v-on="{ ...on, ...onDialog.on }"
          >
            <span>{{ chipString }}</span>
          </v-chip>
        </template>
        <div class="d-flex flex-column">
          <v-chip label x-small dense :color="sprintColor" dark>{{ sprintTitle }}</v-chip>
          <span>{{ tooltipString }}</span>
        </div>
      </v-tooltip>
    </template>
    <progress-form
      :value="metrics"
      :sprint="sprint"
      :time="time"
    />
  </v-dialog>
</template>

<script>
  import DateFormatters from '../../mixins/DateFormatters'
  import ProgressForm from './ProgressForm.vue'

  export default {
    name: 'HeatmapDayItem',
    components: { ProgressForm },
    mixins: [
      DateFormatters,
    ],
    props: {
      rangeAverage: Number,
      metrics: Array,
      time: Date,
      now: Date,
    },
    computed: {
      sprints () {
        return this.$store.getters['sprint/sprints']
      },
      sprint () {
        return this.sprints.find(s => this.time > s.between[0] && this.time <= s.between[1])
      },
      tasks () {
        return this.$store.getters['task/tasks']
          ?.filter(t => t.date === Math.floor(this.time.getTime() / 86400000))
      },
      sprintTitle () {
        return this.sprint?.title
      },
      sprintColor () {
        return this.sprint?.color ?? ''
      },
      accValue () {
        return this.tasks?.reduce((acc, m) => (acc + (m.runningTime ?? 0)), 0)
      },
      chipString () {
        return this.dayFormatter.format(this.time)
      },
      tooltipString () {
        if (this.accValue) {
          return this.$n(this.accValue, 'decimal')
        }

        return '0'
      },
      chipClass () {
        return ''
      },
      chipStyles () {
        const styles = {}
        if (this.sprint) {
          styles['border-right'] = this.sprint.color + ' solid 3px !important'
        }

        return Object.keys(styles).reduce((s, k) => k + ':' + styles[k] + ';' + s, '')
      },
      chipProps () {
        const props = {}
        const nowdate = Math.ceil(this.now.getTime() / (60 * 60 * 24 * 1000))
        if (this.time) {
          const tdate = Math.ceil(this.time.getTime() / (60 * 60 * 24 * 1000))
          if (this.now < this.time) {
            props.color = 'grey lighten-5'
            props.dark = false
          } else if (nowdate === tdate) {
            props.color = 'primary'
            props.dark = true
          } else {
            if (this.accValue) {
              props.color = 'success ' + this.getValueColorByAverage(this.accValue)
              props.dark = true
            } else {
              props.color = 'grey darken-5'
              props.dark = true
            }
          }
        }
        return props
      },
    },
    methods: {
      getValueColorByAverage (value) {
        const pc = value / this.rangeAverage
        if (pc > 0.25) {
          if (pc < 0.5) {
            return 'darken-1'
          } else if (pc < 0.75) {
            return ' darken-2'
          } else if (pc < 1) {
            return 'darken-3'
          } else if (pc < 1) {
            return 'darken-3'
          } else {
            return 'darken-3'
          }
        }
      },
    },
  }
</script>
