<template>
  <v-card color="primary lighten-4">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          <v-tooltip top>
            <template v-slot:activator="tooltip">
              <v-dialog max-width="766">
                <template v-slot:activator="{on}">
                  <v-btn icon small v-on="{ ...on, ...tooltip.on }">
                    <v-icon small>mdi-timeline-plus</v-icon>
                  </v-btn>
                </template>
                <sprints-list />
              </v-dialog>
            </template>
            {{ $t('components.sprintChart.manage') }}
          </v-tooltip>
          <span class="text-normalize">
            {{ sprintDuration }}
          </span>
        </div>
        <v-list-item-title v-if="hasActiveSprint" class="text-h5 mb-1">
          <span class="text-normalize">
            {{ sprintTitle }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle v-if="hasActiveSprint">
          <span>
            {{ sprintRemaining }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        v-if="hasActiveSprint"
        tile
        size="80"
      >
        <v-progress-circular v-model="progressValue" size="80" width="8" rotate="-90" :color="progressColor">
          <div class="d-flex flex-column align-center">
            <v-chip class="mb-1" dark dense small :color="progressColor">
              <strong>{{ progressPercent }}</strong>
            </v-chip>
          </div>
        </v-progress-circular>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
  import { Mixins } from 'paas_admin/dist/paas_admin.umd'
  import SprintsList from './SprintsList.vue'
  import DateFormatters from '../../mixins/DateFormatters'

  export default {
    name: 'SprintChart',
    components: { SprintsList },
    mixins: [
      Mixins.TimestampFormatter.default,
      DateFormatters,
    ],
    props: {
      sprint: Object,
    },
    computed: {
      hasActiveSprint () {
        return !!this.sprint
      },
      sprintTitle () {
        return this.sprint?.title
      },
      progressValue () {
        return 0
      },
      progressPercent () {
        return this.$n(0, 'percent')
      },
      sprintStartDate () {
        return this.dateFormatter.format(this.sprint?.between[0])
      },
      sprintDuration () {
        return this.hasActiveSprint ? this.$t('components.sprintChart.sprintDetails', [
          this.sprintStartDate,
          Math.floor((this.sprint?.between?.[1]?.getTime() - this.sprint?.between?.[0]?.getTime()) / 86400000),
        ]) : this.$t('components.sprintChart.noActive')
      },
      sprintRemaining () {
        return this.$t('components.sprintChart.sprintRemaining', [
          Math.floor((this.sprint?.between?.[1]?.getTime() - (new Date()).getTime()) / 86400000),
        ])
      },
      progressColor () {
        return ''
      },
    },
  }
</script>
