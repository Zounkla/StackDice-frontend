import axios from 'axios'
import { useToast } from '@/composables/useToast'

const FALLBACK_MESSAGES = {
  400: 'Requête invalide : vérifiez les champs renseignés.',
  404: 'Ressource introuvable.',
  409: 'Conflit : cette opération est impossible.',
  500: 'Erreur interne du serveur.',
}

export function extractErrorMessage(error) {
  if (!error.response) {
    return error.code === 'ECONNABORTED'
      ? 'Le serveur met trop de temps à répondre.'
      : 'Impossible de joindre le serveur.'
  }
  const { status, data } = error.response
  const serverMessage = typeof data === 'string' ? data : data?.message || data?.detail
  return serverMessage || FALLBACK_MESSAGES[status] || `Erreur inattendue (${status}).`
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10000,
})

// Gestion centralisée : chaque erreur HTTP déclenche un toast, puis est relancée
// pour que l'appelant puisse réinitialiser son état (loading, etc.).
http.interceptors.response.use(
  (response) => response,
  (error) => {
    useToast().error(extractErrorMessage(error))
    return Promise.reject(error)
  },
)

export default http
