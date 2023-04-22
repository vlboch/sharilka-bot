import storage from 'node-persist'
import config from 'config'
import path from 'path'

class PersistentStorageService {
  constructor(path) {
    this.storage = storage
    this.path = path
  }

  async init() {
    await this.storage.init({
      dir: this.path,
    })
  }

  async set(key, value) {
    await this.storage.setItem(key, value)
  }

  async get(key) {
    const item = await this.storage.getItem(key)

    return item
  }
}

export default new PersistentStorageService(
  path.resolve(__dirname, '..', config.get('PERSISTEN_STORAGE_PATH'))
)
