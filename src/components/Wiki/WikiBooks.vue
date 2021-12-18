<template>
  <v-card>
    <v-card-title>
      <span>{{ $t('components.wiki.wikiBooks.title') }}</span>
      <v-spacer />
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn color="primary" small depressed v-on="on">
            {{ $t('components.wiki.wikiBooks.add') }}
          </v-btn>
        </template>
        <wiki-book-form
          :title="$t('components.wiki.wikiBooks.add')"
          :apply-title="$t('components.wiki.wikiBooks.add')"
          @input="onAddBook"
        />
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <simple-table
        :headers="headers"
        :items="books"
        @remove="removeBook"
      >
        <template v-slot:editForm="{ item }">
          <wiki-book-form
            :value="item"
            :title="getEditTitle(item)"
            :apply-title="$t('components.wiki.wikiBooks.edit.apply')"
            @input="onUpdate"
          />
        </template>
      </simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import SimpleTable from '../SimpleTable/SimpleTable.vue'
  import WikiBookForm from './WikiBookForm.vue'

  export default {
    name: 'WikiBooks',
    components: { SimpleTable, WikiBookForm },
    data: () => ({
    }),
    computed: {
      headers () {
        return [
          {
            text: 'ID',
            value: 'id',
          },
          { text: this.$t('components.table.columns.title'), value: 'title' },
          { text: this.$t('components.table.columns.actions'), value: 'actions' },
        ]
      },
      books () {
        return this.$store.getters['book/books']
      },
    },
    methods: {
      getEditTitle (book) {
        return this.$t('components.wiki.wikiBooks.edit.title', [
          book.id,
        ])
      },
      onUpdate (book) {
        this.$store.dispatch('book/updateBook', book)
        this.$store.dispatch('book/setBookTopics', { bookId: book.id, topics: book.topics ?? [] })
      },
      onAddBook (book) {
        this.$store.dispatch('book/addBook', book)
        this.$store.dispatch('book/addBookTopic', { id: book.id, topics: book.topics ?? [] })
      },
      removeBook (book) {
        this.$store.dispatch('book/removeBook', book.id)
      },
    },
  }
</script>
