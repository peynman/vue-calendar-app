<template>
  <v-card>
    <v-card-title>
      <span>{{ $t('components.progressChart.settings.title') }}</span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-timestamp-input
          v-model="between"
          :label="$t('components.progressChart.settings.between')"
          :rules="[ getRequiredRule() ]"
          range
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="primary" @click="onApply">
        {{ $t('components.progressChart.settings.apply') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { Mixins } from 'paas_admin/dist/paas_admin.umd'

  export default {
    name: 'ProgressSettingsForm',
    mixins: [
      Mixins.FormValidations.default(),
    ],
    data: vm => ({
      valid: false,
      between: null,
    }),
    methods: {
      onApply () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            from: this.between?.[0],
            to: this.between?.[1],
          })
        }
      },
    },
  }
</script>
