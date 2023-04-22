import tagsService from '../services/tags'

export const saveTagMiddleware = (ctx, next) => {
  if (!ctx.message) {
    return next()
  }

  const { text, caption } = ctx.message
  const content = text || caption

  if (!content) {
    ctx.session.containsTag = false

    return next()
  }

  const tags = [...tagsService.extractFromString(content)]

  if (tags.length > 0) {
    tagsService.appendTagsArr(tags)

    ctx.session.containsTag = true
  }

  next()
}

export const clearSystemMessages = (ctx, next) => {
  if (ctx.session.botInfoMsgId) {
    ctx.deleteMessage(ctx.session.botInfoMsgId)
    ctx.session.botInfoMsgId = null
  }

  const isCommand = ctx?.message?.text && ctx?.message?.text[0] === '/'

  if (isCommand) {
    const { message_id } = ctx.message
    ctx.deleteMessage(message_id)
  }

  next()
}

export const editMessageTag = async (ctx, next) => {
  const repliedMessage = ctx.message?.reply_to_message

  if (repliedMessage && !repliedMessage.text && ctx.message.text) {
    const tags = tagsService.extractFromString(ctx.message.text)

    if (tags.length === 0) return

    const caption = [repliedMessage.caption || '', tags.join(' ')].join('\n')

    await ctx.telegram.copyMessage(
      repliedMessage.chat.id,
      repliedMessage.chat.id,
      repliedMessage.message_id,
      { caption }
    )

    tagsService.appendTagsArr(tags)

    ctx.deleteMessage(repliedMessage.message_id)
    ctx.deleteMessage(ctx.message_id)
  }

  return next()
}
