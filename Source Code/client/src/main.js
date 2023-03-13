import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import interceptor from './services/Interceptor'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

interceptor();

createApp(App)
.use(store)
.use(router)
.use(vuetify)
.mount('#app')