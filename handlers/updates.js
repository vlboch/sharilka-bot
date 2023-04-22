import {
  RemoveTimeout,
  RemoveTimeoutForSystem,
  ReplyMessagesEnum,
} from '../constants/contants'
import schedulerService from '../services/scheduler'

export const onUnmarkedMessage = async (ctx) => {
  if (!ctx.session.containsTag) {
    const { message_id } = ctx.message
    const { message_id: warning_id } = await ctx.reply(
      ReplyMessagesEnum.NO_TAG_WARNING
    )

    schedulerService.removeMessageAfter(RemoveTimeout, ctx, message_id)
    schedulerService.removeMessageAfter(RemoveTimeoutForSystem, ctx, warning_id)
  }
}
