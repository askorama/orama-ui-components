import { createApp } from 'vue'
import './style.css'
import { ComponentLibrary } from '@orama/vue-components'
import App from './App.vue'

createApp(App).use(ComponentLibrary).mount('#app')
