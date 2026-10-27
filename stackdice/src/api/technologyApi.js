import http from '@/api/http'

const BASE = '/technology'

export const technologyApi = {
  /** @returns {Promise<{content: object[], totalElements: number, totalPages: number, number: number, size: number}>} */
  list({ category, compatibility, page = 0, size = 10, sort = 'name,asc' } = {}) {
    return http
      .get(BASE, {
        params: { category: category || undefined, compatibility: compatibility || undefined, page, size, sort },
      })
      .then((r) => r.data)
  },

  get: (uuid) => http.get(`${BASE}/${uuid}`).then((r) => r.data),
  create: (payload) => http.post(BASE, payload).then((r) => r.data),
  update: (uuid, payload) => http.put(`${BASE}/${uuid}`, payload).then((r) => r.data),
  remove: (uuid) => http.delete(`${BASE}/${uuid}`),
  draw: () => http.get(`${BASE}/draw`).then((r) => r.data),
}
