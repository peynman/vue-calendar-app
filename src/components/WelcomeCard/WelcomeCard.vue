<template>
  <v-card :color="cardColor">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          <span class="text-normalize">
            {{ todayTimeString }}
          </span>
        </div>
        <v-list-item-title class="text-h5 mb-1">
          <span class="text-normalize">{{ todayString }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ todayWeekDayName }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="80"
      >
        <v-progress-circular v-model="progressValue" size="80" width="8" rotate="-90" :color="progressColor">
          <div class="d-flex flex-column align-center">
            <v-chip class="mb-1" dark dense small :color="progressColor">
              <strong>{{ progressDays }}</strong>
            </v-chip>
            <span class="caption" style="line-height: 0.7rem; letter-spacing: 0;">
              {{ progressString }}
            </span>
          </div>
        </v-progress-circular>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
  import { Mixins } from 'paas_admin/dist/paas_admin.umd'

  export default {
    name: 'WelcomeCard',
    mixins: [
      Mixins.TimestampFormatter.default,
    ],
    computed: {
      weedDayFormatter () {
        return new Intl.DateTimeFormat(
          this.theme.website.formatting.locale,
          {
            calendar: 'persian',
            numberingSystem: 'arab',
            weekday: 'long',
          }
        )
      },
      targetDate () {
        return Date.parse('2022-05-13')
      },
      progressDays () {
        return Math.ceil(Math.abs(((new Date()) - this.targetDate) / (1000 * 60 * 60 * 24)))
      },
      todayTimeString () {
        return this.timeFormatter.format(new Date())
      },
      progressValue () {
        return 100 - this.progressDays / 3.65
      },
      progressColor () {
        return this.progressValue <= 70 ? 'green' : (
          this.progressValue <= 80 ? 'indigo' : this.progressValue <= 90 ? 'orange' : 'red'
        )
      },
      cardColor () {
        return this.progressValue <= 70 ? 'green accent-1' : (
          this.progressValue <= 80 ? 'indigo accent-1' : this.progressValue <= 90 ? 'orange accent-1' : 'red accent-1'
        )
      },
      todayString () {
        return this.$t('components.timeRemainingCard.today', [
          this.getDateFromatted(new Date()),
        ])
      },
      todayWeekDayName () {
        return this.weedDayFormatter.format(new Date())
      },
      progressString () {
        return this.$t('components.timeRemainingCard.progress', [
        ])
      },
    },
  }
</script>
