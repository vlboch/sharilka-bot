import config from 'config'
import { Telegraf } from 'telegraf'
import { saveTagMiddleware } from './middlewares'

const main = async () => {
  const bot = new Telegraf(config.get('BOT_TOKEN'))

  bot.use(saveTagMiddleware)

  bot.launch()
  bot.catch((err) => {
    console.error(err)
  })

  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

main()
