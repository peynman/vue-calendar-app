export default {
  name: 'TemplateCalendarApp',
  description: '',
  attributes: [
  ],
  events: [
  ],
  slots: [
    {
      name: 'default',
      description: 'The default Vue slot.',
    },
  ],
  'vue-model': {
    prop: 'value',
    event: 'input',
  },
  factory: () => ({
    component: import('./CalendarApp.vue'),
  }),
}
