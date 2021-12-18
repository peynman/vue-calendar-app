<template>
  <tr>
    <td><v-icon :color="importanceColor">mdi-record</v-icon></td>
    <td>{{ internalValue.title }}</td>
    <td>
      <div
        v-for="(s, si) in internalValue.sources"
        :key="`si-${si}`"
        class="my-1"
      >
        <span>{{ s }}</span>
      </div>
    </td>
    <td />
    <td>
      <v-chip
        small
        dark
        label
        class="me-1"
        :color="theme.colorM"
        :disabled="internalValue.multM == 0"
      >{{ internalValue.multM }}</v-chip>
      <v-chip
        small
        dark
        label
        :color="theme.colorO"
        :disabled="internalValue.multO == 0"
      >{{ internalValue.multO }}</v-chip>
    </td>
    <td>
      <v-chip
        small
        dark
        label
        class="me-1"
        :color="theme.colorM"
        :disabled="internalValue.qCountM == 0"
      >{{ internalValue.qCountM }}</v-chip>
      <v-chip
        small
        dark
        label
        :color="theme.colorO"
        :disabled="internalValue.qCountO == 0"
      >{{ internalValue.qCountO }}</v-chip>
    </td>
    <td>
      <v-dialog v-model="dialog">
        <info-item-form v-model="internalValue" @input="onUpdateItem" />
      </v-dialog>
      <v-btn small icon color="primary" @click="onEdit">
        <v-icon small>mdi-database-edit</v-icon>
      </v-btn>
      <v-btn small icon color="red" @click="$emit('remove')">
        <v-icon small>mdi-database-remove</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
  import InfoItemForm from '../WikiTable/InfoItemForm.vue'

  export default {
    name: 'InfoItem',
    components: { InfoItemForm },
    props: {
      value: Object,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
      dialog: false,
      theme: {
        colorM: 'red',
        colorQ: 'blue',
      },
    }),
    computed: {
      importanceColor () {
        if (
        this.internalValue?.multM !== '0' &&
        this.internalValue.multO !== '0'
        ) {
          return 'purple'
        } else {
          if (this.internalValue?.multM !== '0') {
            return this.theme.colorM
          } else {
            return this.theme.colorO
          }
        }
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onEdit () {
        this.dialog = true
      },
      onUpdateItem () {
        this.$emit('update', this.internalValue)
      },
    },
  }
</script>
