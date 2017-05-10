import Vue from 'vue'

export default {
  getRecord(genres) {
    const url = `/api/${genres.toLowerCase()}`
    return Vue.http.get(url)
  },
  archiveRecord(id) {
    let data = { id: id }
    const url = '/api/record/archive'
    return Vue.http.post(url, data)
  },
  trashRecord(id) {
    let data = { id: id }
    const url = '/api/record/trash'
    return Vue.http.post(url, data)
  },
  getTags() {
    const url = '/api/tags'
    return Vue.http.get(url)
  },
  createTag(tag) {
    let data = { tag: tag }
    const url = '/api/tags'
    return Vue.http.post(url, data)
  },
  updateTag(id, tag) {
    let data = { id: id, tag: tag }
    const url = '/api/tags/update'
    return Vue.http.post(url, data)
  },
  deleteTag(id) {
    let data = { id: id }
    const url = '/api/tags/delete'
    return Vue.http.post(url, data)
  },
  linkTag(tagIds, recordId) {
    let data = { tag_ids: tagIds, record_id: recordId }
    const url = '/api/tags/link'
    return Vue.http.post(url, data)
  },
  getRecordByTag(tagId) {
    const url = `/api/record/bytag?tag_id=${tagId}`
    return Vue.http.get(url)
  }
}
