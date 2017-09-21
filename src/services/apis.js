import Vue from 'vue'

export default {
  getRecord(genres) {
    const url = `/api/${genres.toLowerCase()}`
    return Vue.http.get(url)
  },
  updateRecord(id, title = null, content = null) {
    let data = { id: id }
    if (title) {
      data.title = title
    }
    if (content) {
      data.content = content
    }
    const url = '/api/record/update'
    return Vue.http.post(url, data)
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
  },
  removeRecord(recordId) {
    let data = { id: recordId }
    const url = '/api/record/remove'
    return Vue.http.post(url, data)
  },
  getUser() {
    const url = '/api/user'
    return Vue.http.get(url)
  },
  logout() {
    const url = '/api/signout'
    return Vue.http.get(url)
  }
}
