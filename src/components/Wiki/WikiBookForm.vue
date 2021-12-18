<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="internalValue.title"
          :label="$t('components.wiki.wikiBooks.labels.title')"
          :rules="[ getRequiredRule() ]"
          @keyup="onKeyUp"
        />
        <v-color-picker-input
          v-model="internalValue.color"
          :label="$t('components.wiki.wikiBooks.labels.color')"
          @keyup="onKeyUp"
        />
        <wiki-book-topic v-model="internalValue.topics" />
      </v-form>
    </v-card-text>
    <v-card-text />
    <v-card-actions>
      <v-btn color="primary" @click="onApply">
        {{ applyTitle }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { Mixins } from 'paas_admin/dist/paas_admin.umd'
  import WikiBookTopic from './WikiBookTopic.vue'

  export default {
    name: 'WikiBookForm',
    components: { WikiBookTopic },
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
          this.$emit('input', {
            ...this.internalValue,
            topics: [...(this.internalValue.topics ?? [])],
          })
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
