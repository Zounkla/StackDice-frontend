<script setup>
import { categoryLabel, compatibilityLabel } from '@/constants/enums'

defineProps({
  label: { type: String, required: true },
  emoji: { type: String, default: '🧩' },
  technology: { type: Object, default: null },
})
</script>

<template>
  <article class="tech-card">
    <header class="tech-card__label"><span>{{ emoji }}</span> {{ label }}</header>
    <template v-if="technology">
      <h3 class="tech-card__name">{{ technology.name }}</h3>
      <p class="tech-card__desc">{{ technology.description || 'Aucune description.' }}</p>
      <div class="tech-card__badges">
        <span class="badge">{{ categoryLabel(technology.category) }}</span>
        <span class="badge badge--alt">{{ compatibilityLabel(technology.compatibility) }}</span>
      </div>
    </template>
    <p v-else class="tech-card__desc">Aucune technologie tirée.</p>
  </article>
</template>

<style scoped>
.tech-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 1.4rem; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: .6rem;
  animation: pop .4s ease both;
}
.tech-card__label { font-size: .8rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); font-weight: 700; }
.tech-card__name { margin: 0; font-size: 1.4rem; color: var(--primary); }
.tech-card__desc { margin: 0; color: var(--muted); line-height: 1.5; flex: 1; }
.tech-card__badges { display: flex; gap: .4rem; flex-wrap: wrap; }
@keyframes pop { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }
</style>
