import { createApp } from 'vue';
import './assets/index.css'
import App from './App.vue';
import router from './router';
import { MotionPlugin } from '@vueuse/motion'

createApp(App).use([router,MotionPlugin]).mount('#app');
