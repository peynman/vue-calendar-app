<template>
  <v-tabs-items v-model="internalValue" centered>
    <v-tab-item v-for="tab in tabs" :key="`tab-${tab.value}`">
      <component :is="tab.component" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
  import Tabs from './tabs'

  export default {
    name: 'CalendarToolbarTabs',
    props: {
      value: Number,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    computed: {
      tabs () {
        return Tabs(this)
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
  }
</script>
