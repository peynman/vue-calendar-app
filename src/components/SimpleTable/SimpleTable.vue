<template>
  <v-data-table
    v-model="internalValue"
    dense
    :headers="headers"
    :items="items"
    :show-select="showSelect"
    :single-select="singleSelect"
    item-key="id"
    class="elevation-1"
    @input="$emit('input', internalValue)"
  >
    <template v-for="(h, hi) in headers" v-slot:[h.value]="{ item }">
      <component :is="getColumnComponent(h, item)" :key="`table-item-${hi}`" :value="item" />
    </template>
    <template v-if="!hideActions" v-slot:item.actions="{ item }">
      <edit-remove-column :value="item" @remove="$emit('remove', item)">
        <template v-slot:form="form">
          <slot name="editForm" :item="form.item" />
        </template>
      </edit-remove-column>
    </template>
  </v-data-table>
</template>

<script>
  import EditRemoveColumn from '../Tables/Columns/EditRemoveColumn.vue'

  export default {
    name: 'SimpleTable',
    components: {
      EditRemoveColumn,
    },
    props: {
      hideActions: Boolean,
      showSelect: Boolean,
      singleSelect: Boolean,
      headers: Array,
      value: Array,
      items: Array,
    },
    data: vm => ({
      internalValue: vm.value ?? [],
    }),
  }
</script>
