<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="internalValue.title"
          :label="$t('components.wiki.wikiBooks.edit.topics.labels.title')"
          :rules="[ getRequiredRule() ]"
          @keyup="onKeyUp"
        />
        <v-text-field
          v-model="internalValue.index"
          :label="$t('components.wiki.wikiBooks.edit.topics.labels.index')"
          :rules="[ getRequiredRule() ]"
          @keyup="onKeyUp"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="onApply">
        {{ applyTitle }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { Mixins } from 'paas_admin/dist/paas_admin.umd'
  export default {
    name: 'WikiBookTopicForm',
    mixins: [
      Mixins.FormValidations.default(),
    ],
    props: {
      title: String,
      applyTitle: String,
      value: Object,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
      valid: false,
    }),
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onApply () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', { ...this.internalValue })
        }
      },
      onKeyUp (e) {
        if (e.keyCode === 13) {
          this.onApply()
        }
      },
    },
  }
</script>
