export default $component => ([
  {
    text: $component.$t('components.calendarApp.tabs.0'),
    value: 0,
    component: () => import('./Home.vue'),
  },
  {
    text: $component.$t('components.calendarApp.tabs.1'),
    value: 1,
    component: () => import('./WikiHome.vue'),
  },
])
