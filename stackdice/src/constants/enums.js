// Doit rester synchronisé avec les enums Java `Category` et `Compatibility`.
export const CATEGORIES = [
  { value: 'FRONT', label: 'Frontend' },
  { value: 'BACK', label: 'Backend' },
  { value: 'DESKTOP', label: 'Desktop' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'DATABASE', label: 'Base de données' },
  { value: 'CHALLENGE', label: 'Challenge' },
]

export const COMPATIBILITIES = [
  { value: 'WEB', label: 'Web' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'DESKTOP', label: 'Desktop' },
  { value: 'LOCAL', label: 'Local' },
  { value: 'ANY', label: 'Toutes plateformes' },
]

const toLabelMap = (list) => Object.fromEntries(list.map((i) => [i.value, i.label]))
const CATEGORY_LABELS = toLabelMap(CATEGORIES)
const COMPATIBILITY_LABELS = toLabelMap(COMPATIBILITIES)

export const categoryLabel = (v) => CATEGORY_LABELS[v] ?? v ?? '—'
export const compatibilityLabel = (v) => COMPATIBILITY_LABELS[v] ?? v ?? '—'
