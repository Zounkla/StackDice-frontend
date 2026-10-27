import { reactive, readonly } from 'vue'

// État module-level : utilisable depuis n'importe où (composants, intercepteur axios…).
const toasts = reactive([])
let nextId = 0

function push(type, message, duration = 4000) {
  const id = ++nextId
  toasts.push({ id, type, message })
  setTimeout(() => dismiss(id), duration)
}

function dismiss(id) {
  const index = toasts.findIndex((t) => t.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    dismiss,
    success: (message) => push('success', message),
    error: (message) => push('error', message, 6000),
    info: (message) => push('info', message),
  }
}
