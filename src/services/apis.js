import Vue from 'vue'

const defaultRecord = [{
  archive: 0,
  content: '扫描下方二维码添加好友，发送信息以添加内容',
  created_at: 1506090428.23444,
  genres: 'Text',
  id: 'default',
  is_delete: 0,
  tags: [],
  title: '注目',
  trash: 0,
  user_id: 'default'
}, {
  archive: 0,
  content: '/static/picture/default.png',
  created_at: 1506225295.03035,
  genres: 'Picture',
  id: 'default',
  is_delete: 0,
  tags: [],
  title: '扫码添加',
  trash: 0,
  user_id: 'default'
}]
export default {
  getDefault() {
    return defaultRecord
  },
  getRecord(genres, page = '1') {
    const url = `/api/${genres.toLowerCase()}?page=${page}`
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
