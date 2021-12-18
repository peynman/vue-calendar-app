<template>
  <v-card
    :color="color"
    dark
    tile
    class="d-flex flex-row px-3 py-2 align-center justify-center"
  >
    <span class="text-h5">{{ minutes }}</span>
    <strong class="text-h5">:</strong>
    <span class="text-h5">{{ hours }}</span>
    <v-btn v-if="showPause" x-small icon class="ms-1" @click="onToggle">
      <v-icon small>{{ isRunning ? 'mdi-pause' : 'mdi-play' }}</v-icon>
    </v-btn>
    <confirm-remove-dialog v-if="showRefresh" @remove="onRefresh">
      <template v-slot:activator="{on}">
        <v-btn x-small icon class="ms-1" v-on="on">
          <v-icon small>mdi-refresh</v-icon>
        </v-btn>
      </template>
    </confirm-remove-dialog>
  </v-card>
</template>

<script>
  import { Components } from 'paas_admin/dist/paas_admin.umd'
  export default {
    name: 'TaskItemTimer',
    components: {
      ConfirmRemoveDialog: Components.Inputs.ConfirmDialog.ConfirmRemoveDialog.default,
    },
    props: {
      value: Number,
      autoStart: Boolean,
      status: String,
    },
    data: vm => ({
      internalValue: vm.value ?? 0,
      isRunning: false,
    }),
    computed: {
      hours () {
        return (Math.floor(this.internalValue / 60) + '').padStart(2, '0')
      },
      minutes () {
        return (this.internalValue % 60 + '').padStart(2, '0')
      },
      color () {
        if (this.status === 'running') {
          return 'primary darken-3'
        } else if (this.status === 'done') {
          return 'green darken-3'
        } else {
          return 'secondary'
        }
      },
      showRefresh () {
        return this.status === 'done'
      },
      showPause () {
        return this.status === 'running'
      },
    },
    watch: {
      value () {
        this.internalValue = this.value ?? 0
      },
    },
    mounted () {
      if (this.autoStart) {
        this.startTimer()
      }
    },
    methods: {
      onRefresh () {
        this.internalValue = 0
        this.$emit('input', this.internalValue)
      },
      onToggle () {
        if (this.isRunning) {
          this.stopTimer()
        } else {
          this.startTimer()
        }
      },
      timerInterval () {
        this.internalValue += 1
        this.$emit('input', this.internalValue)
      },
      startTimer () {
        this.isRunning = true
        this.interval = setInterval(this.timerInterval, 60000)
      },
      stopTimer () {
        this.isRunning = false
        clearInterval(this.interval)
      },
    },
  }
</script>
