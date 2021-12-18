import { Mixins } from 'paas_admin/dist/paas_admin.umd'

export default {
  mixins: [
    Mixins.TimestampFormatter.default,
  ],
  computed: {
    dayFormatter () {
      return new Intl.DateTimeFormat(
        this.theme.website.formatting.locale, {
          calendar: 'persian',
          numberingSystem: 'arab',
          day: 'numeric',
        }
      )
    },
    monthNameFormatter () {
      return new Intl.DateTimeFormat(
        this.theme.website.formatting.locale, {
          calendar: 'persian',
          numberingSystem: 'arab',
          month: 'long',
        }
      )
    },
    weedDayFormatter () {
      return new Intl.DateTimeFormat(
        this.theme.website.formatting.locale, {
          calendar: 'persian',
          numberingSystem: 'arab',
          weekday: 'long',
        }
      )
    },
  },
}
