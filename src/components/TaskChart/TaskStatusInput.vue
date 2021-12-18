<template>
  <v-input
    vertical
    :label="$t('components.taskChart.labels.status')"
    hide-details
  >
    <v-btn-toggle
      v-model="selectedIndex"
      class="mb-3"
      @change="onEmit"
    >
      <v-btn v-for="(b, bi) in avStatus" :key="`status-${bi}`" small depressed>
        {{ b.text }}
      </v-btn>
    </v-btn-toggle>
  </v-input>
</template>

<script>
  export default {
    name: 'TaskStatusInput',
    props: {
      value: String,
    },
    data: vm => ({
      selectedIndex: 0,
    }),
    computed: {
      avStatus () {
        return Object.keys(this.$t('components.taskChart.status')).map(k => ({
          text: this.$t('components.taskChart.status.' + k),
          value: k,
        }))
      },
    },
    watch: {
      value () {
        this.selectedIndex = this.getIndexFromValue(this.value)
      },
    },
    mounted () {
      this.selectedIndex = this.getIndexFromValue(this.value)
    },
    methods: {
      getIndexFromValue (value) {
        return this.avStatus.findIndex(p => p.value === value)
      },
      getValueFromIndex (index) {
        return this.avStatus[index]?.value
      },
      onEmit () {
        this.$emit('input', this.getValueFromIndex(this.selectedIndex))
      },
    },
  }
</script>
