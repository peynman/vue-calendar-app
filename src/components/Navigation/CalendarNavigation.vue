<template>
  <v-navigation-drawer
    v-model="internalValue"
    app
    right
    temporary
    width="300px"
    :color="theme.website.navigation.color"
    :dark="theme.website.navigation.dark"
    :light="theme.website.navigation.light"
  >
    <v-list
      :color="theme.website.navigation.color"
      :dark="theme.website.navigation.dark"
      :light="theme.website.navigation.light"
    >
      <user-account-detailed
        v-if="isLoggedIn"
        :color="theme.website.navigation.menu.color"
        :dark="theme.website.navigation.menu.dark"
        :light="theme.website.navigation.menu.light"
      />
      <v-divider />
      <navigation-item v-for="(link, index) in links" :key="`nav-${index}`" :link="link" />
      <v-divider />
      <v-list-item v-if="$vuetify.breakpoint.xs">
        <v-list-item-content>
          <v-btn text @click="internalValue = !internalValue">
            <v-icon class="me-2">mdi-chevron-double-right</v-icon>
            {{ $t('components.website.navigation.return') }}
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import UserProfile from '../../../mixins/UserProfile'
  import MenuItems from './menu'
  import NavigationItem from '../../Admin/Navigation/NavigationItem.vue'
  import UserAccountDetailed from '../../Admin/UserAccount/UserAccountDetailed.vue'
  import Themeable from '../../../mixins/Themeable'
  import ProductCategories from '../../../mixins/ProductCategories'

  export default {
    name: 'WebsiteNavigation',
    components: {
      NavigationItem,
      UserAccountDetailed,
    },
    mixins: [
      UserProfile,
      Themeable,
      ProductCategories,
    ],
    props: {
      value: Boolean,
    },
    data: vm => ({
      internalValue: vm.value,
      categories: [],
    }),
    computed: {
      links () {
        return MenuItems(m => this.$t(m))
          .filter(m => (m.auth === undefined || (m.auth === false && !this.isLoggedIn) || (m.auth === true && this.isLoggedIn)))
          .filter(m => (m.admin === undefined || (m.admin === false && !this.isAdmin) || (m.admin === true && this.isAdmin)))
          .concat(this.categories)
          .sort((m1, m2) => m1.order - m2.order)
      },
    },
    watch: {
      value (n) {
        this.internalValue = n
      },
      internalValue (n) {
        this.$emit('input', n)
      },
    },

    mounted () {
      this.getProductCategoriesHeirarchy(c => !!c.data?.queryFrontEnd).then(categories => {
        this.categories = categories
      })
    },
  }
</script>
