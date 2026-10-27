<script setup>
import BaseModal from '@/components/BaseModal.vue'

defineProps({
  title: { type: String, default: 'Confirmation' },
  message: { type: String, required: true },
  loading: Boolean,
})
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <BaseModal :title="title" @close="emit('cancel')">
    <p class="message">{{ message }}</p>
    <template #footer>
      <button class="btn btn-ghost" type="button" :disabled="loading" @click="emit('cancel')">Annuler</button>
      <button class="btn btn-danger" type="button" :disabled="loading" @click="emit('confirm')">
        {{ loading ? 'Suppression…' : 'Supprimer' }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.message { margin: 0; line-height: 1.5; }
</style>
