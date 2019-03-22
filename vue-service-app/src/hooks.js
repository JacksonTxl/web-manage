/**
 * Simple Middleware Hooks Constructor
 */
export class Hooks {
  constructor() {
    this.hooks = []
    this._i = 0
  }
  get _count() {
    return this.hooks.length
  }
  addHooks(hooks = []) {
    this.hooks.push(...hooks)
    return this
  }
  addHook(hook) {
    this.hooks.push(hook)
    return this
  }
  run(done) {
    const count = this._count
    if (!count) {
      done()
    }
    const next = () => {
      const fn = this.hooks[this._i]
      if (fn) {
        // async
        if (fn.length > 0) {
          fn(() => {
            this._i++
            if (this._i < count) {
              next()
            } else {
              done()
            }
          })
        } else {
          fn()
          this._i++
          if (this._i < count) {
            next()
          } else {
            done()
          }
        }
      }
    }
    next()
  }
}
