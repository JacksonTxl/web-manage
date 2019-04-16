<script>
import { merge } from 'lodash-es'
export default {
  name: 'StSwitch',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    checked: {
      get() {
        return !!this.value
      }
    }
  },
  render(h) {
    const props = merge(
      {
        checked: this.checked
      },
      this.$attrs
    )
    const listeners = merge(
      {
        change: newChecked => {
          const newVal = newChecked ? 1 : 0
          this.$emit('input', newVal)
          this.$emit('change', newVal)
        }
      },
      this.$listeners
    )
    return h(
      'a-switch',
      {
        props,
        on: listeners,
        scopedSlots: this.$scopedSlots,
        slot: this.$slots
      },
      this.$slots
    )
  }
}
</script>
