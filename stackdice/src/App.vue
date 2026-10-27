<script setup>
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>
  <header class="navbar">
    <div class="container navbar__inner">
      <RouterLink to="/" class="brand">🎲 Stack Roulette</RouterLink>
      <nav class="navbar__links">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/admin">Administration</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container main">
    <RouterView />
  </main>

  <ToastContainer />
</template>

<style scoped>
.navbar { background: var(--surface); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.navbar__inner { display: flex; justify-content: space-between; align-items: center; height: 64px; }
.brand { font-weight: 800; font-size: 1.15rem; color: var(--text); text-decoration: none; }
.navbar__links { display: flex; gap: .4rem; }
.navbar__links a { padding: .5rem .9rem; border-radius: 10px; color: var(--muted); text-decoration: none; font-weight: 600; }
.navbar__links a:hover { background: var(--bg); }
.navbar__links a.router-link-exact-active { background: color-mix(in srgb, var(--primary) 12%, transparent); color: var(--primary); }
.main { padding-top: 1.5rem; padding-bottom: 3rem; }
@media (max-width: 480px) { .brand { font-size: 1rem; } .navbar__links a { padding: .4rem .6rem; font-size: .9rem; } }
</style>
