<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({ title: { type: String, required: true } })
const emit = defineEmits(['close'])

const onKeydown = (e) => e.key === 'Escape' && emit('close')
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @mousedown.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true" :aria-label="title">
        <header class="modal__header">
          <h2>{{ title }}</h2>
          <button class="btn btn-icon btn-ghost" type="button" aria-label="Fermer" @click="emit('close')">✕</button>
        </header>
        <div class="modal__body"><slot /></div>
        <footer v-if="$slots.footer" class="modal__footer"><slot name="footer" /></footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; z-index: 900; padding: 1rem;
  background: rgba(20, 22, 40, .5); backdrop-filter: blur(3px);
  display: grid; place-items: center;
}
.modal {
  width: min(520px, 100%); max-height: 100%; overflow: auto;
  background: var(--surface); border-radius: var(--radius); box-shadow: var(--shadow);
}
.modal__header { display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.4rem; border-bottom: 1px solid var(--border); }
.modal__header h2 { margin: 0; font-size: 1.15rem; }
.modal__body { padding: 1.4rem; }
.modal__footer { display: flex; justify-content: flex-end; gap: .6rem; padding: 1rem 1.4rem; border-top: 1px solid var(--border); }
</style>
