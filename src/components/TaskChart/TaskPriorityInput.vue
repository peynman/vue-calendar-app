<template>
  <v-input
    vertical
    :label="$t('components.taskChart.labels.priority')"
    hide-details
  >
    <v-btn-toggle
      v-model="selectedIndex"
      class="mb-3"
      @change="onEmit"
    >
      <v-btn v-for="(b, bi) in avPriorities" :key="`status-${bi}`" small depressed>
        {{ b.text }}
      </v-btn>
    </v-btn-toggle>
  </v-input>
</template>

<script>
  export default {
    name: 'TaskPriorityInput',
    props: {
      value: String,
    },
    data: vm => ({
      selectedIndex: 0,
    }),
    computed: {
      avPriorities () {
        return Object.keys(this.$t('components.taskChart.priorities')).map(k => ({
          text: this.$t('components.taskChart.priorities.' + k),
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
        return this.avPriorities.findIndex(p => p.value === value)
      },
      getValueFromIndex (index) {
        return this.avPriorities[index]?.value
      },
      onEmit () {
        this.$emit('input', this.getValueFromIndex(this.selectedIndex))
      },
    },
  }
</script>
