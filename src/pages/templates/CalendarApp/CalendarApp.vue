<template>
  <div class="fill-height">
    <calendar-appbar />
    <v-main class="d-flex justify-center align-center strip-back" :style="styles">
      <slot name="toolbar" />
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
  import CalendarAppbar from '../../../components/CalendarApp/CalendarAppbar.vue'

  export default {
    name: 'CalendarApp',
    components: {
      CalendarAppbar,
    },
    props: {
      styles: Object,
    },
    data: vm => ({
      tab: 0,
    }),
  }
</script>
