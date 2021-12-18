<template>
  <v-card dense class="d-flex flex-column">
    <v-card-title class="py-1">
      <span class="caption">
        {{ $t('components.wiki.wikiBooks.labels.topics') }}
      </span>
      <v-spacer />
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn color="primary" small depressed v-on="on">
            {{ $t('components.wiki.wikiBooks.edit.topics.add') }}
          </v-btn>
        </template>
        <wiki-book-topic-form
          :title="$t('components.wiki.wikiBooks.edit.topics.add')"
          :apply-title="$t('components.wiki.wikiBooks.edit.topics.add')"
          @input="addTopic"
        />
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <simple-table
        style="width: 100%;"
        :headers="topicHeaders"
        :items="internalValue"
        @remove="removeTopic"
      >
        <template v-slot:editForm="{ item }">
          <wiki-book-topic-form
            :title="$t('components.wiki.wikiBooks.edit.topics.edit.title')"
            :apply-title="$t('components.wiki.wikiBooks.edit.topics.edit.apply')"
            :value="item"
            @input="updateTopic"
          />
        </template>
      </simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import WikiBookTopicForm from './WikiBookTopicForm.vue'
  import SimpleTable from '../SimpleTable/SimpleTable.vue'
  import { makeRandomId } from '../../utils/helpers'

  export default {
    name: 'WikiBookTopic',
    components: {
      SimpleTable,
      WikiBookTopicForm,
    },
    props: {
      value: Array,
    },
    data: vm => ({
      internalValue: vm.value ?? [],
    }),
    computed: {
      topicHeaders () {
        return [
          {
            text: 'ID',
            value: 'id',
          },
          {
            text: 'ّIndex',
            value: 'index',
          },
          { text: this.$t('components.table.columns.title'), value: 'title' },
          { text: this.$t('components.table.columns.actions'), value: 'actions' },
        ]
      },
    },
    methods: {
      addTopic (topic) {
        if (!topic.id) {
          topic.id = makeRandomId()
        }
        this.internalValue.push(topic)
        this.$emit('input', [...this.internalValue])
      },
      updateTopic (topic) {
        const index = this.internalValue.indexOf(topic)
        if (index >= 0) {
          this.$set(this.internalValue, index, topic)
          this.$emit('input', [...this.internalValue])
        }
      },
      removeTopic (topic) {
        const index = this.internalValue.indexOf(topic)
        if (index >= 0) {
          this.internalValue.splice(index, 1)
          this.$emit('input', [...this.internalValue])
        }
      },
    },
  }
</script>
