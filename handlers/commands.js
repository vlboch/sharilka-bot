import tags from '../services/tags'

export const showAllTags = async (ctx) => {
  const savedTags = tags.getAllTags()
  const outputStr = savedTags.map((tag) => `📁 ${tag}`).join('\n')

  if (outputStr.length > 0) {
    const { message_id } = await ctx.reply(outputStr)
    ctx.session.botInfoMsgId = message_id
  }
}
