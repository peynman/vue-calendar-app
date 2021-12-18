<template>
  <heatmap-chart
    :x-labels="xLabels"
    :y-labels="yLabels"
  >
    <template v-slot:item="{ index }">
      <heatmap-day-item
        :range-average="rangeAverage"
        :now="new Date()"
        :time="getDateMatrixTime(index.xi, index.yi)"
        :metrics="getDateMatrixMetrics(index.xi, index.yi)"
      />
    </template>
  </heatmap-chart>
</template>

<script>
  import { addToDate } from '../../utils/helpers'
  import DateFormatters from '../../mixins/DateFormatters'
  import HeatmapDayItem from './HeatmapDayItem.vue'
  import HeatmapChart from '../Heatmap/HeatmapChart.vue'

  export default {
    name: 'DialyHeatmap',
    components: {
      HeatmapDayItem,
      HeatmapChart,
    },
    mixins: [
      DateFormatters,
    ],
    props: {
      from: {
        type: Number,
        default: -60,
      },
      to: {
        type: Number,
        default: 38,
      },
      value: Array,
      sprints: Array,
    },
    data: vm => ({
      chartObj: null,
    }),
    computed: {
      rangeDays () {
        const nums = []
        for (let i = this.from; i < this.to; i++) {
          nums.push(i)
        }
        return nums.map(n => addToDate(new Date(), n, 'd'))
      },
      rangeAverage () {
        const av = this.value?.reduce((a, v) => {
          return a + v._value
        }, 0)
        return av / this.value?.length
      },
      xLabels () {
        const weeksCount = Math.ceil(this.rangeDays.length / 7)
        const weeks = []
        for (let i = 0; i < weeksCount; i++) {
          const fd = new Date(this.rangeDays[0].getTime() + i * (7 * 60 * 60 * 24 * 1000))
          weeks.push(this.monthNameFormatter.format(fd))
        }
        return weeks
      },
      yLabels () {
        const dayNames = this.rangeDays?.map(v => this.weedDayFormatter.format(v))
        return dayNames.filter((d, p) => dayNames.indexOf(d) === p)
      },
    },
    methods: {
      getDateMatrixTime (xi, yi) {
        return this.rangeDays[xi * this.yLabels.length + yi]
      },
      getDateMatrixPrevDayTime (xi, yi) {
        if (xi * this.yLabels.length + yi > 1) {
          return this.rangeDays[xi * this.yLabels.length + yi - 1]
        }
        return null
      },
      getDateMatrixMetrics (xi, yi) {
        const to = this.getDateMatrixTime(xi, yi)?.getTime() ?? 0
        const from = this.getDateMatrixPrevDayTime(xi, yi)?.getTime() ?? 0

        return this.value?.filter(m => m._time.getTime() >= from && m._time.getTime() <= to)
      },
    },
  }
</script>
