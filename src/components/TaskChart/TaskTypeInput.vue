<template>
  <v-input
    vertical
    :label="$t('components.taskChart.labels.type')"
    hide-details
  >
    <v-btn-toggle
      v-model="selectedIndex"
      class="mb-3"
      @change="onEmit"
    >
      <v-btn v-for="(b, bi) in avTypes" :key="`type-${bi}`" small depressed>
        {{ b.text }}
      </v-btn>
    </v-btn-toggle>
  </v-input>
</template>

<script>
  export default {
    name: 'TaskTypeInput',
    props: {
      value: String,
    },
    data: vm => ({
      selectedIndex: 0,
    }),
    computed: {
      avTypes () {
        return Object.keys(this.$t('components.taskChart.types')).map(k => ({
          text: this.$t('components.taskChart.types.' + k),
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
        return this.avTypes.findIndex(p => p.value === value)
      },
      getValueFromIndex (index) {
        return this.avTypes[index]?.value
      },
      onEmit () {
        this.$emit('input', this.getValueFromIndex(this.selectedIndex))
      },
    },
  }
</script>
