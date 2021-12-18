<template>
  <v-card>
    <v-card-title>
      <v-chip label :color="theme.colorM" dark>مهندسی</v-chip>
      <v-chip label :color="theme.colorO" dark class="mx-1">علوم</v-chip>
      <span>منابع کنکور کارشناسی ارشد</span>
      <v-spacer />
      <v-btn small icon @click="onDownload"><v-icon>mdi-download</v-icon></v-btn>
      <v-dialog>
        <template v-slot:activator="{ on }">
          <v-btn icon color="success" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <info-item-form @input="onAddInfo" />
      </v-dialog>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th v-for="(c, i) in columns" :key="`header-${i}`" class="text-center">
                {{ c }}
              </th>
            </tr>
          </thead>
          <tbody>
            <info-item-row
              v-for="(item, i) in items"
              :key="`row-${i}`"
              :value="item"
              @remove="onRemoveItem(i)"
              @update="onUpdateItem(i, $event)"
            />
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import InfoItemForm from './WikiTable/InfoItemForm.vue'
  import InfoItemRow from './WikiTable/InfoItemRow.vue'
  import Theme from '../mixins/Theme'

  export default {
    name: 'InfoTable',
    components: { InfoItemForm, InfoItemRow },
    mixins: [Theme],
    data: () => ({
      columns: ['', 'درس', 'منابع', 'سرفصل‌ها', 'ضریب', 'تعداد سوال', 'امکانات'],
      items: [],
    }),
    mounted () {
      const itemsStr = localStorage.getItem('curr')
      if (itemsStr) {
        this.items = JSON.parse(itemsStr)
      }
    },
    methods: {
      onAddInfo (nv) {
        this.items.push(nv)
        this.saveTable()
      },
      onRemoveItem (i) {
        this.items.splice(i, 1)
        this.saveTable()
      },
      onUpdateItem (i, n) {
        this.items[i] = n
        this.saveTable()
      },
      onDownload () {
        const element = document.createElement('a')
        element.setAttribute(
          'href',
          'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.items))
        )
        element.setAttribute('download', '1401.json')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      },
      saveTable () {
        localStorage.setItem('curr', JSON.stringify(this.items))
      },
    },
  }
</script>
