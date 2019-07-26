import { isPlainObject, isString } from 'lodash-es'

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        this.$stForm = {
          create: () => {
            const form = this.$form.createForm(this)
            form.validate = function(options) {
              return new Promise((resolve, reject) => {
                options = options || {
                  // https://github.com/yiminghe/dom-scroll-into-view#function-parameter
                  scroll: {
                    alignWithTop: false
                  }
                }
                form.validateFieldsAndScroll(options, (errs, values) => {
                  try {
                    if (errs) {
                      resolve(errs)
                    } else {
                      resolve(values)
                    }
                  } catch (e) {
                    reject(e)
                  }
                })
              })
            }
            return form
          },
          createDecorators: options => {
            if (!isPlainObject(options)) {
              throw new Error(
                `[vue-st-form]#createDecorators shoud pass an object but got ${typeof options}`
              )
            }
            const _decorators = {}
            Object.keys(options).forEach(key => {
              const opt = options[key]
              if (opt.rules) {
                throw new Error(
                  '[vue-st-form]#createDecorators dont support [rules],just use validator instead'
                )
              }
              const decoOpt = opt
              if (opt.validator) {
                decoOpt.rules = [
                  {
                    validator: function(rule, value, callback) {
                      // 添加try  catch 以抓取运行时错误
                      try {
                        const res = opt.validator(rule, value)
                        //  如果验证返回undefined 或者true 算通过
                        if (res === undefined || res === true) {
                          return callback()
                        }
                        // 验证不通过
                        if (res === false) {
                          return callback(opt.message || `${key}字段验证未通过`)
                        }
                        if (isString(res)) {
                          return callback(res)
                        }

                        if (res instanceof Promise) {
                          return res.then(
                            () => {
                              callback()
                            },
                            rejectRes => {
                              callback(rejectRes)
                            }
                          )
                        }

                        // 其它所有情况算作通过
                        return callback()
                      } catch (e) {
                        console.error(e)
                      }
                    }
                  }
                ]
              }
              _decorators[key] = [key, decoOpt]
            })

            console.log(_decorators)

            return _decorators
          }
        }
      }
    })
  }
}
