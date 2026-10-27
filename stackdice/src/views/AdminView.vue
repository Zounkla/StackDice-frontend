<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { technologyApi } from '@/api/technologyApi'
import { useToast } from '@/composables/useToast'
import { CATEGORIES, COMPATIBILITIES, categoryLabel, compatibilityLabel } from '@/constants/enums'
import AppIcon from '@/components/AppIcon.vue'
import BasePagination from '@/components/BasePagination.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import TechnologyFormModal from '@/components/TechnologyFormModal.vue'

const toast = useToast()

const items = ref([])
const loading = ref(false)
const pagination = reactive({ page: 0, size: 10, totalPages: 0, totalElements: 0 })
const filters = reactive({ category: '', compatibility: '' })

const formOpen = ref(false)
const editing = ref(null)
const toDelete = ref(null)
const deleting = ref(false)

async function load() {
  loading.value = true
  try {
    const data = await technologyApi.list({ ...filters, page: pagination.page, size: pagination.size })
    items.value = data.content
    pagination.totalPages = data.totalPages
    pagination.totalElements = data.totalElements
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}

// Un changement de filtre ou de taille de page ramène à la première page.
watch([() => filters.category, () => filters.compatibility, () => pagination.size], () => {
  pagination.page = 0
  load()
})

function changePage(page) {
  pagination.page = page
  load()
}

function openCreate() {
  editing.value = null
  formOpen.value = true
}

function openEdit(tech) {
  editing.value = tech
  formOpen.value = true
}

function onSaved() {
  formOpen.value = false
  load()
}

async function confirmDelete() {
  deleting.value = true
  try {
    await technologyApi.remove(toDelete.value.id)
    toast.success('Technologie supprimée.')
    // Si on vient de vider la dernière page, on recule d'une page.
    if (items.value.length === 1 && pagination.page > 0) pagination.page--
    toDelete.value = null
    await load()
  } catch {
    toDelete.value = null
  } finally {
    deleting.value = false
  }
}

onMounted(load)
</script>

<template>
  <section>
    <header class="page-header">
      <div>
        <h1>Administration</h1>
        <p class="muted">Gérez le catalogue des technologies.</p>
      </div>
      <button class="btn btn-primary" type="button" @click="openCreate">
        <AppIcon name="plus" /> Ajouter
      </button>
    </header>

    <div class="card">
      <div class="filters">
        <select v-model="filters.category" class="field" aria-label="Filtrer par catégorie">
          <option value="">Toutes les catégories</option>
          <option v-for="c in CATEGORIES" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
        <select v-model="filters.compatibility" class="field" aria-label="Filtrer par compatibilité">
          <option value="">Toutes les compatibilités</option>
          <option v-for="c in COMPATIBILITIES" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
        <select v-model.number="pagination.size" class="field" aria-label="Éléments par page">
          <option v-for="n in [5, 10, 20, 50]" :key="n" :value="n">{{ n }} / page</option>
        </select>
      </div>

      <p v-if="loading && !items.length" class="state">Chargement…</p>
      <p v-else-if="!items.length" class="state">Aucune technologie trouvée.</p>

      <table v-else class="table" :class="{ 'table--loading': loading }">
        <thead>
          <tr><th>Nom</th><th>Catégorie</th><th>Compatibilité</th><th>Description</th><th class="actions-col">Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="tech in items" :key="tech.id">
            <td data-label="Nom"><strong>{{ tech.name }}</strong></td>
            <td data-label="Catégorie"><span class="badge">{{ categoryLabel(tech.category) }}</span></td>
            <td data-label="Compatibilité"><span class="badge badge--alt">{{ compatibilityLabel(tech.compatibility) }}</span></td>
            <td data-label="Description" class="muted">{{ tech.description || '—' }}</td>
            <td class="actions">
              <button class="btn btn-icon btn-ghost" type="button" title="Modifier" aria-label="Modifier" @click="openEdit(tech)">
                <AppIcon name="edit" />
              </button>
              <button class="btn btn-icon btn-ghost btn-ghost--danger" type="button" title="Supprimer" aria-label="Supprimer" @click="toDelete = tech">
                <AppIcon name="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <BasePagination
        :page="pagination.page"
        :total-pages="pagination.totalPages"
        :total-elements="pagination.totalElements"
        :disabled="loading"
        @update:page="changePage"
      />
    </div>

    <TechnologyFormModal v-if="formOpen" :technology="editing" @close="formOpen = false" @saved="onSaved" />
    <ConfirmDialog
      v-if="toDelete"
      title="Supprimer la technologie"
      :message="`Voulez-vous vraiment supprimer « ${toDelete.name} » ? Cette action est définitive.`"
      :loading="deleting"
      @confirm="confirmDelete"
      @cancel="toDelete = null"
    />
  </section>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.4rem; }
.page-header h1 { margin: 0; }
.page-header p { margin: .2rem 0 0; }
.filters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .8rem; margin-bottom: 1.2rem; }
.state { text-align: center; color: var(--muted); padding: 2.5rem 0; }

.table { width: 100%; border-collapse: collapse; transition: opacity .15s; }
.table--loading { opacity: .5; }
.table th { text-align: left; font-size: .78rem; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); padding: .6rem .8rem; border-bottom: 1px solid var(--border); }
.table td { padding: .8rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
.table tbody tr:hover { background: var(--bg); }
.actions-col { text-align: right !important; }
.actions { display: flex; justify-content: flex-end; gap: .3rem; }

@media (max-width: 720px) {
  .filters { grid-template-columns: 1fr; }
  .table thead { display: none; }
  .table, .table tbody, .table tr, .table td { display: block; width: 100%; }
  .table tr { border: 1px solid var(--border); border-radius: 12px; margin-bottom: .8rem; padding: .4rem 0; }
  .table td { border: none; padding: .4rem .9rem; display: flex; justify-content: space-between; gap: 1rem; text-align: right; }
  .table td[data-label]::before { content: attr(data-label); font-weight: 600; color: var(--muted); text-align: left; }
  .actions { justify-content: flex-end; }
}
</style>
