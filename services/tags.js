import storage from './storage'
import { StorageKeys } from '../constants/contants'

class TagsManager {
  constructor() {
    this.tagList = new Set()
  }

  async syncData() {
    const savedTags = await storage.get(StorageKeys.TAGS_LIST)

    if (savedTags && savedTags.length > 0) {
      savedTags.map((tag) => this.tagList.add(tag))
    }
  }

  extractFromString(testString) {
    const str = testString + ''

    return [...str.matchAll(/(?:^|\s)(#[a-zA-Z\d]+)/g)].map(([_, tag]) => tag)
  }

  appendTag(tagName) {
    this.tagList.add(tagName)

    storage.set(StorageKeys.TAGS_LIST, this.getAllTags())
  }

  appendTagsArr(tagsArr) {
    tagsArr.map((tag) => {
      this.appendTag(tag)
    })
  }

  getAllTags() {
    return [...this.tagList.values()]
  }

  async clearTags() {
    this.tagList.clear()
    storage.set(StorageKeys.TAGS_LIST, [])
  }
}

export default new TagsManager()
