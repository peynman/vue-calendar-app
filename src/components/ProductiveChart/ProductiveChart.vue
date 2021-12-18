<template>
  <single-stat
    icon="mdi-account-clock"
  />
</template>

<script>
  import { Components } from 'paas_admin/dist/paas_admin.umd'

  export default {
    name: 'ProductiveChartCard',
    components: {
      SingleStat: Components.Inputs.Charts.SingleStat.default,
    },
  }
</script>
