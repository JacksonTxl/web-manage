import { isPlainObject, isString, isArray, cloneDeep } from 'lodash-es'

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
                      reject(errs)
                    } else {
                      resolve(values)
                    }
                  } catch (e) {
                    reject(e)
                  }
                })
              })
            }
            form.decorators = function(options) {
              if (!isPlainObject(options)) {
                throw new Error(
                  `[vue-st-form]#createDecorators shoud pass an object but got ${typeof options}`
                )
              }
              const _decorators = {}

              const makeAntValidator = (fn, key) => (rule, value, callback) => {
                // 添加try  catch 以抓取运行时错误
                try {
                  const res = fn(rule, value, form.getFieldsValue())
                  //  如果验证返回undefined 或者true 算通过
                  if (res === undefined || res === true) {
                    return callback()
                  }
                  // 验证不通过
                  if (res === false) {
                    return callback(rule.message || `${key}字段验证未通过`)
                  }
                  if (isString(res)) {
                    return callback(res)
                  }

                  if (res instanceof Promise) {
                    return res.then(
                      () => {
                        callback()
                      },
                      rejectErr => {
                        // console.error(rejectErr)
                        callback(rejectErr.message)
                      }
                    )
                  }

                  // 其它所有情况算作通过
                  return callback()
                } catch (e) {
                  console.error(e)
                }
              }
              Object.keys(options).forEach(key => {
                const opt = options[key]
                let decoOpt = opt

                if (opt.rules) {
                  if (!isArray(opt.rules)) {
                    throw new Error(
                      `[vue-st-form] ${key} rules should be Array`
                    )
                  }
                  decoOpt.rules = cloneDeep(opt.rules)
                  opt.rules.forEach(rule => {
                    if (rule.validator) {
                      rule.validator = makeAntValidator(
                        rule.validator,
                        key,
                        rule
                      )
                    }
                  })
                }

                _decorators[key] = [key, decoOpt]
              })

              console.log(_decorators)

              return _decorators
            }
            return form
          }
        }
      }
    })
  }
}
