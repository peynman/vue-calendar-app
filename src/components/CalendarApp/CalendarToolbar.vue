<template>
  <v-toolbar color="green darken-3" dark>
    <v-tabs v-model="internalValue" centered @change="$emit('input', internalValue)">
      <v-tab v-for="tab in tabs" :key="`tab-${tab.value}`">
        <span class="text-normalize">{{ tab.text }}</span>
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
  import Tabs from './tabs'

  export default {
    name: 'CalendarToolbar',
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
