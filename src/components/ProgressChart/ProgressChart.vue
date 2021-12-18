<template>
  <v-card>
    <v-system-bar>
      <span>{{ $t('components.progressChart.title') }}</span>
      <v-spacer />
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon small v-on="on"><v-icon small>mdi-cog</v-icon></v-btn>
        </template>
        <progress-settings-form />
      </v-dialog>
    </v-system-bar>
    <v-card-text>
      <daily-heatmap :sprints="sprints" :value="metrics" />
    </v-card-text>
  </v-card>
</template>

<script>
  import DailyHeatmap from './DailyHeatmap.vue'
  import ProgressSettingsForm from './ProgressSettingsForm.vue'

  export default {
    name: 'ProgressChartCard',
    components: {
      DailyHeatmap,
      ProgressSettingsForm,
    },
    computed: {
      sprints () {
        return this.$store.getters['sprint/sprints']
      },
      metrics () {
        return []
      },
    },
  }
</script>
