<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column">
      <v-chip outlined label dense class="me-1" />
      <v-chip
        v-for="(yAxis, yi) in yLabels"
        :key="`heatmap-yaxis-${yi}`"
        label
        color="tranparent"
        class="mt-1 me-1 text-center"
      >{{ yAxis }}</v-chip>
    </div>
    <v-window>
      <v-slide-group show-arrows>
        <v-slide-item v-for="(xAxis, xi) in xLabels" :key="`heatmap-x-${xi}`">
          <div class="d-flex flex-column">
            <v-chip label dense class="me-1">{{ xAxis }}</v-chip>
            <template
              v-for="(yAxis, yi) in yLabels"
            >
              <slot name="item" :index="{ xi, yi }" />
            </template>
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-window>
  </div>
</template>

<script>
  export default {
    name: 'HeatmapChart',
    props: {
      xLabels: Array,
      yLabels: Array,
    },
    data: vm => ({
      chartObj: null,
    }),
  }
</script>
