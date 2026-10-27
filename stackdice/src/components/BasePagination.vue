<script setup>
// `page` est indexée à partir de 0 (convention Spring Data).
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  totalElements: { type: Number, default: 0 },
  disabled: Boolean,
})
const emit = defineEmits(['update:page'])
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <span class="pagination__info">{{ totalElements }} résultat{{ totalElements > 1 ? 's' : '' }}</span>
    <div class="pagination__controls">
      <button class="btn btn-ghost" type="button" :disabled="disabled || page <= 0" @click="emit('update:page', page - 1)">
        ← Précédent
      </button>
      <span class="pagination__page">Page {{ totalPages === 0 ? 0 : page + 1 }} / {{ totalPages }}</span>
      <button class="btn btn-ghost" type="button" :disabled="disabled || page + 1 >= totalPages" @click="emit('update:page', page + 1)">
        Suivant →
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pagination { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: .8rem; margin-top: 1.2rem; }
.pagination__info { color: var(--muted); font-size: .9rem; }
.pagination__controls { display: flex; align-items: center; gap: .6rem; }
.pagination__page { font-weight: 600; font-size: .9rem; }
@media (max-width: 520px) { .pagination { justify-content: center; } }
</style>
