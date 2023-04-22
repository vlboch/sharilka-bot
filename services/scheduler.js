class SchedulerService {
  constructor() {
    /** @type {Map<number, number>} Pool of the active timeouts*/
    this.timeoutsPool = new Map()
  }
  /**
   * Setup new timeout to action
   * @param {Object} action object with action data
   * @param {Function} action.callback callback function invocked after timeout
   * @param {Number} action.id id of the specific action
   * @param {Number} delay delay in ms to timeout
   */
  setActiveTimeout(action, delay) {
    const timeoutID = setTimeout(action.callback, delay)

    this.timeoutsPool.set(action.id, timeoutID)
  }
  /**
   * Id of the action to discard
   * @param {Number} actionID
   */
  discardTimeout(actionID) {
    const timeoutID = this.timeoutsPool.get(actionID)

    if (timeoutID) {
      clearTimeout(timeoutID)
      this.timeoutsPool.delete(actionID)
    }
  }
  /**
   * Discard all setted timeouts and clear the
   */
  discardAllTimeouts() {
    this.timeoutsPool.forEach((timeoutID) => clearTimeout(timeoutID))
    this.timeoutsPool.clear()
  }
}

export default new SchedulerService()
