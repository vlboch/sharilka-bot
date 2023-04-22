import tagsManager from '../services/tags'

export const saveTagMiddleware = (ctx, next) => {
  const { text, caption } = ctx.message
  const content = text || caption

  if (!content) return next()

  const tags = [...tagsManager.extractFromString(content)]

  tags.map(([_, tagName]) => tagsManager.appendTag(tagName))
  
  next()
}
