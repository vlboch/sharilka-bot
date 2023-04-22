export const StorageKeys = Object.freeze({
  TAGS_LIST: 'tagsList',
})

export const CommandsEnum = Object.freeze({
  GET_TAGS: ['tags', 'ls', 'll'],
})

export const InitialSessionStore = Object.freeze({
  containsTag: false,
  botInfoMsgId: null
})

export const ReplyMessagesEnum = Object.freeze({
  NO_TAG_WARNING: `✋ Content without tag will be deleted after 24h...`,
  CREATE_NEW_TAG: '👍 Write name to the new tag...',
})

export const RemoveTimeout = 1000 * 60 * 60 * 24

export const RemoveTimeoutForSystem = 2500