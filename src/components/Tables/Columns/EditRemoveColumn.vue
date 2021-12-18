<template>
  <div class="d-flex flex-row">
    <v-dialog max-width="766">
      <template v-slot:activator="{on}">
        <v-btn icon v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
      </template>
      <slot name="form" :item="value" />
    </v-dialog>
    <confirm-remove-dialog v-if="!hideRemove" @remove="onRemove">
      <template v-slot:activator="{on}">
        <v-btn icon color="red" v-on="on"><v-icon small>mdi-database-remove</v-icon></v-btn>
      </template>
    </confirm-remove-dialog>
  </div>
</template>

<script>
  import { Components } from 'paas_admin/dist/paas_admin.umd'
  export default {
    name: 'EditRemoveColumn',
    components: {
      ConfirmRemoveDialog: Components.Inputs.ConfirmDialog.ConfirmRemoveDialog.default,
    },
    props: {
      value: Object,
      hideRemove: Boolean,
    },
    methods: {
      onRemove () {
        this.$emit('remove')
      },
    },
  }
</script>
