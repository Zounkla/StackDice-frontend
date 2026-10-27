<script setup>
import { reactive, ref, computed } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { technologyApi } from '@/api/technologyApi'
import { useToast } from '@/composables/useToast'
import { CATEGORIES, COMPATIBILITIES } from '@/constants/enums'

const props = defineProps({
  /** Technologie à modifier ; null = création. */
  technology: { type: Object, default: null },
})
const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const isEdit = computed(() => props.technology !== null)

const form = reactive({
  name: props.technology?.name ?? '',
  category: props.technology?.category ?? '',
  compatibility: props.technology?.compatibility ?? '',
  description: props.technology?.description ?? '',
})
const errors = reactive({})
const saving = ref(false)

function validate() {
  errors.name = form.name.trim() ? '' : 'Le nom est obligatoire'
  errors.category = form.category ? '' : 'La catégorie est obligatoire'
  errors.compatibility = form.compatibility ? '' : 'La compatibilité est obligatoire'
  return !errors.name && !errors.category && !errors.compatibility
}

async function submit() {
  if (!validate()) return
  saving.value = true
  const payload = { ...form, name: form.name.trim(), description: form.description.trim() }
  try {
    if (isEdit.value) {
      await technologyApi.update(props.technology.id, payload)
      toast.success('Technologie modifiée.')
    } else {
      await technologyApi.create(payload)
      toast.success('Technologie créée.')
    }
    emit('saved')
  } catch {
    // Toast déjà affiché par l'intercepteur HTTP.
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <BaseModal :title="isEdit ? 'Modifier la technologie' : 'Ajouter une technologie'" @close="emit('close')">
    <form id="tech-form" class="form" novalidate @submit.prevent="submit">
      <label class="form__group">
        <span>Nom *</span>
        <input v-model="form.name" class="field" :class="{ 'field--error': errors.name }" type="text" autofocus />
        <small v-if="errors.name" class="form__error">{{ errors.name }}</small>
      </label>

      <div class="form__row">
        <label class="form__group">
          <span>Catégorie *</span>
          <select v-model="form.category" class="field" :class="{ 'field--error': errors.category }">
            <option value="" disabled>Choisir…</option>
            <option v-for="c in CATEGORIES" :key="c.value" :value="c.value">{{ c.label }}</option>
          </select>
          <small v-if="errors.category" class="form__error">{{ errors.category }}</small>
        </label>

        <label class="form__group">
          <span>Compatibilité *</span>
          <select v-model="form.compatibility" class="field" :class="{ 'field--error': errors.compatibility }">
            <option value="" disabled>Choisir…</option>
            <option v-for="c in COMPATIBILITIES" :key="c.value" :value="c.value">{{ c.label }}</option>
          </select>
          <small v-if="errors.compatibility" class="form__error">{{ errors.compatibility }}</small>
        </label>
      </div>

      <label class="form__group">
        <span>Description</span>
        <textarea v-model="form.description" class="field" rows="3" />
      </label>
    </form>

    <template #footer>
      <button class="btn btn-ghost" type="button" :disabled="saving" @click="emit('close')">Annuler</button>
      <button class="btn btn-primary" type="submit" form="tech-form" :disabled="saving">
        {{ saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : 'Créer' }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 1rem; }
.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form__group { display: flex; flex-direction: column; gap: .35rem; font-weight: 600; font-size: .9rem; }
.form__error { color: var(--danger); font-weight: 500; }
@media (max-width: 520px) { .form__row { grid-template-columns: 1fr; } }
</style>
