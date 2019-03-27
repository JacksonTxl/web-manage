<script>
const style = {
  'round-small': {
    'padding': '0 26px',
    'border-radius': '10000px',
    'height': '28px',
    'font-size': '12px'
  },
  'round': {
    'border-radius': '10000px',
    'height': '40px',
    'width': '158px',
    'font-size': '14px'
  },
  'round-middle': {
    'padding': '0 26px',
    'border-radius': '10000px',
    'height': '40px',
    'font-size': '14px'
  },
  'round-large': {
    'padding': '0 26px',
    'border-radius': '10000px',
    'height': '28px',
    'font-size': '12px'
  },
  'round-full': {
    'width': '100%',
    'padding': '0 26px',
    'border-radius': '10000px',
    'height': '40px',
    'font-size': '14px'
  }
}
export default {
  name: 'StButton',
  props: {
    round: { type: String, default: '' }
  },
  // round
  render(h) {
    return h(
      'a-button',
      {
        props: {
          ...this.$attrs
        },
        style: style[this.round],
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
