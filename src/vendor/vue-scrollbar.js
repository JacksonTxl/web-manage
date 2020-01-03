import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  install(Vue) {
    const el_scrollBar = (el, options) => {
      if (el._perfect_scrollbar_ instanceof PerfectScrollbar) {
        el._perfect_scrollbar_.update()
      } else {
        el._perfect_scrollbar_ = new PerfectScrollbar(el, {
          suppressScrollX: options.suppressScrollX,
          wheelPropagation: options.wheelPropagation
        })
      }
    }

    Vue.directive('scrollBar', {
      inserted(el, binding, vnode) {
        let options = {}
        options.wheelPropagation =
          binding.value === undefined ? true : !binding.value.stopPropagation
        options.suppressScrollX =
          binding.value === undefined ? true : !!binding.value.suppressScrollX
        const rules = ['fixed', 'absolute', 'relative']
        if (!rules.includes(window.getComputedStyle(el, null).position)) {
          console.error(
            `perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join(
              '、'
            )}`
          )
        }
        el_scrollBar(el, options)
      },
      componentUpdated(el, binding, vnode, oldVnode) {
        let options = {}
        options.wheelPropagation =
          binding.value === undefined ? true : !binding.value.stopPropagation
        options.suppressScrollX =
          binding.value === undefined ? true : !!binding.value.suppressScrollX
        try {
          vnode.context.$nextTick(() => {
            el_scrollBar(el, options)
          })
        } catch (error) {
          console.error(error)
          el_scrollBar(el, options)
        }
      }
    })
  }
}
