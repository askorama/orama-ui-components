import { createApp } from 'vue'
import './style.css'
import { ComponentLibrary } from 'ui-stencil-vue'
import App from './App.vue'

createApp(App).use(ComponentLibrary).mount('#app')
