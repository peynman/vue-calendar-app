<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <welcome-card />
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <sprint-chart :sprint="sprint" />
    </v-col>
    <!-- <v-col cols="12" sm="6" md="4">
        <productive-chart />
      </v-col> -->
    <v-col cols="12" sm="6" md="4">
      <task-chart />
    </v-col>
    <v-col cols="12" sm="12">
      <progress-chart />
    </v-col>
  </v-row>
</template>

<script>
  // import ProductiveChart from '../../components/ProductiveChart/ProductiveChart.vue'
  import ProgressChart from '../ProgressChart/ProgressChart.vue'
  import SprintChart from '../SprintChart/SprintChart.vue'
  import TaskChart from '../TaskChart/TaskChart.vue'
  import WelcomeCard from '../WelcomeCard/WelcomeCard.vue'

  export default {
    name: 'Home',
    components: {
      WelcomeCard,
      // ProductiveChart,
      ProgressChart,
      SprintChart,
      TaskChart,
    },
    mixins: [
    ],
    computed: {
      sprint () {
        return this.$store.getters['sprint/activeSprint']
      },
    },
  }
</script>
