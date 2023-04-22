import { Telegraf, session } from 'telegraf'
import { onUnmarkedMessage } from './handlers/updates'
import { showAllTags } from './handlers/commands'
import { CommandsEnum, InitialSessionStore } from './constants/contants'
import {
  saveTagMiddleware,
  clearSystemMessages,
  editMessageTag,
} from './handlers/middlewares'

import config from 'config'
import storageService from './services/storage'
import tagsService from './services/tags'

const initApplication = async () => {
  await storageService.init()
  await tagsService.syncData()

  const bot = new Telegraf(config.get('BOT_TOKEN'))

  bot.use(
    session({ defaultSession: () => Object.assign({}, InitialSessionStore) })
  )

  bot.use(saveTagMiddleware)
  bot.use(clearSystemMessages)
  bot.use(editMessageTag)

  bot.command(CommandsEnum.GET_TAGS, showAllTags)
  bot.on('message', onUnmarkedMessage)

  bot.launch()

  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

initApplication()
