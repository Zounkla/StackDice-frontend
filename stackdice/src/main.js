import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { useToast } from '@/composables/useToast'
import '@/assets/main.css'

const app = createApp(App)

// Filet de sécurité : toute erreur Vue non gérée finit en toast.
app.config.errorHandler = (err) => {
  console.error(err)
  useToast().error('Une erreur inattendue est survenue.')
}

app.use(router).mount('#app')
