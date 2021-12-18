<template>
  <div class="d-flex flex-column my-2">
    <div class="d-flex flex-row justify-start">
      <span>
        {{ taskTitle }}
      </span>
    </div>
    <div class="d-flex flex-row">
      <v-chip
        dark
        dense
        x-small
        label
        class="me-1"
        :color="taskColor"
      >
        {{ taskStatusString }}
      </v-chip>
      <v-chip
        dark
        dense
        x-small
        label
      >
        {{ taskPriorityString }}
      </v-chip>
      <v-chip
        dark
        dense
        x-small
        label
        class="mx-1"
      >
        {{ taskTypeString }}
      </v-chip>
      <v-chip
        dark
        dense
        x-small
        label
        :color="taskDifficultyColor"
      >
        {{ taskDifficultyString }}
      </v-chip>
    </div>
    <div class="d-flex flex-row mt-1">
      <v-chip
        dark
        dense
        x-small
        label
        :color="taskDifficultyColor"
        class="me-1"
      >
        <v-icon small class="me-1">mdi-timer-sand</v-icon>
        {{ taskMintuesString }}
      </v-chip>
      <div v-for="(book, bi) in taskBooks" :key="`book-${bi}`" class="d-flex flex-row">
        <v-chip
          dark
          dense
          x-small
          label
          :color="book.color"
          class="me-1"
        >{{ book.title }}</v-chip>
      </div>
      <div v-for="(topic, ti) in taskTopics" :key="`topic-${ti}`" class="d-flex flex-row">
        <v-chip
          dark
          dense
          x-small
          label
          class="me-1"
        >{{ topic.title }}</v-chip>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskModel from '../../../mixins/TaskModel'

  export default {
    name: 'TaskTitleColumn',
    mixins: [
      TaskModel,
    ],
    props: {
      value: Object,
    },
    data: vm => ({
    }),
  }
</script>
