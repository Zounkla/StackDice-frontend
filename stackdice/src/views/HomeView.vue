<script setup>
import { computed, ref } from 'vue'
import { technologyApi } from '@/api/technologyApi'
import TechnologyCard from '@/components/TechnologyCard.vue'
import AppIcon from '@/components/AppIcon.vue'

const stack = ref(null)
const loading = ref(false)

const cards = computed(() => [
  { label: 'Frontend', emoji: '🎨', technology: stack.value?.frontend },
  { label: 'Backend', emoji: '⚙️', technology: stack.value?.backend },
  { label: 'Base de données', emoji: '🗄️', technology: stack.value?.database },
  { label: 'Challenge', emoji: '🔥', technology: stack.value?.challenge },
])

async function draw() {
  loading.value = true
  try {
    stack.value = await technologyApi.draw()
  } catch {
    // Toast déjà affiché par l'intercepteur HTTP.
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="home">
    <div class="hero">
      <h1>Quelle stack pour ton prochain projet ?</h1>
      <p>Laisse le hasard composer une combinaison de technologies cohérente.</p>
      <button class="btn btn-primary btn-lg" type="button" :disabled="loading" @click="draw">
        <AppIcon name="dice" :size="22" />
        {{ loading ? 'Tirage en cours…' : stack ? 'Tirer à nouveau' : 'Tirer une stack' }}
      </button>
    </div>

    <div v-if="stack" class="result">
      <p v-if="stack.projectType" class="result__type">
        Type de projet : <strong>{{ stack.projectType }}</strong>
      </p>
      <div class="result__grid">
        <TechnologyCard v-for="c in cards" :key="c.label + (c.technology?.id ?? '')" v-bind="c" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { text-align: center; padding: 2.5rem 0 2rem; }
.hero h1 { font-size: clamp(1.7rem, 4vw, 2.6rem); margin: 0 0 .6rem; }
.hero p { color: var(--muted); margin: 0 0 1.8rem; font-size: 1.05rem; }
.result__type { text-align: center; margin: 0 0 1.4rem; font-size: 1.1rem; }
.result__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.2rem; }
</style>
