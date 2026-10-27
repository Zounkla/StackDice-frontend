<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, dismiss } = useToast()
</script>

<template>
  <div class="toast-container" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast--${t.type}`" role="status" @click="dismiss(t.id)">
        {{ t.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed; top: 1rem; right: 1rem; z-index: 1000;
  display: flex; flex-direction: column; gap: .6rem;
  width: min(380px, calc(100vw - 2rem));
}
.toast {
  padding: .85rem 1.1rem; border-radius: 12px; color: #fff; cursor: pointer;
  box-shadow: var(--shadow); font-weight: 500; font-size: .95rem;
}
.toast--success { background: var(--success); }
.toast--error { background: var(--danger); }
.toast--info { background: var(--primary); }
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(30px); }
</style>
