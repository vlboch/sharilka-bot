class TagsManager {
  constructor() {
    this.tagList = new Set()
  }

  extractFromString(testString) {
    const str = testString + ''

    return str.matchAll(/(?:^|\s)(#[a-zA-Z\d]+)/g)
  }

  appendTag(tagName) {
    this.tagList.add(tagName)
  }

  getAllTags() {
    return [...this.tagList.values()]
  }
}

export default new TagsManager()
