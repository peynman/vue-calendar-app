<template>
  <v-card>
    <v-card-title>اطلاعات درس جدید</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="internalValue.title"
          hide-details
          label="عنوان درس"
        />
        <div class="d-flex flex-column my-3">
          <v-text-field
            v-for="(s, i) in internalValue.sources"
            :key="`source-${i}`"
            v-model="internalValue.sources[i]"
            hide-details
            label="نام منبع"
          >
            <template v-slot:append>
              <v-btn
                icon
                @click="removeSource(i)"
              ><v-icon>mdi-close</v-icon></v-btn>
            </template>
          </v-text-field>
          <v-text-field
            v-model="newSource"
            hide-details
            label="منبع جدید"
            @keyup="onNewSource"
          />
        </div>
        <div class="d-flex flex-row my-3">
          <v-text-field
            v-model="internalValue.multM"
            hide-details
            type="number"
            label="ضریب مهندسی"
          />
          <v-text-field
            v-model="internalValue.multO"
            hide-details
            type="number"
            label="ضریب علوم"
          />
        </div>
        <div class="d-flex flex-row my-3">
          <v-text-field
            v-model="internalValue.qCountM"
            hide-details
            type="number"
            label="تعداد سوالات در مهندسی"
          />
          <v-text-field
            v-model="internalValue.qCountO"
            hide-details
            type="number"
            label="تعداد سوالات در علوم"
          />
        </div>
        <div class="d-flex flex-column my-3">
          <div
            v-for="(c, i) in internalValue.contents"
            :key="`contents-${i}`"
            class="d-flex flex-row align-center"
          >
            <v-text-field v-model="c.title" hide-details label="سرفصل" />
            <v-text-field
              v-model="internalValue.contents[i].importance"
              hide-details
              label="اهمیت سرفصل"
            />
            <v-btn
              icon
              @click="removeContent(i)"
            ><v-icon>mdi-close</v-icon></v-btn>
          </div>
          <v-text-field
            v-model="newContentTitle"
            hide-details
            label="سرفصل جدید"
            @keyup="onNewContent"
          />
        </div>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="primary" @click="onInput">Save Changes</v-btn>
      <v-spacer />
      <v-btn color="warning" @click="internalValue = {}">Clear Form</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'AddInfoItem',
    props: {
      value: Object,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
      newSource: null,
      newContentTitle: null,
    }),
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onNewSource (e) {
        if (e.keyCode === 13) {
          if (!this.internalValue.sources) {
            this.$set(this.internalValue, 'sources', [])
          }
          this.internalValue.sources.push(this.newSource)
          this.newSource = null
        }
      },
      removeSource (i) {
        this.internalValue.sources.splice(i, 1)
      },
      onNewContent (e) {
        if (e.keyCode === 13) {
          if (!this.internalValue.contents) {
            this.$set(this.internalValue, 'contents', [])
          }
          this.internalValue.contents.push({
            title: this.newContentTitle,
            importance: 0,
          })
          this.newContentTitle = null
        }
      },
      removeContent (i) {
        this.internalValue.contents.splice(i, 1)
      },
      onInput () {
        this.$emit('input', this.internalValue)
      },
    },
  }
</script>
