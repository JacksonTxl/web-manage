<template>
  <div :class="b()">
    <a-input
      :size="size"
      :class="b('input')"
      :placeholder="placeholder"
      @change="onChange"
    />
    <span
      :class="[b('button'), isClick ? b('button--disabled') : '']"
      @click="onClick"
    >
      {{ buttonText }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'InputPhoneCode',
  bem: {
    b: 'input-phone-code'
  },
  props: {
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    isCountTime: Boolean,
    size: {
      type: String,
      default: 'large'
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        this.init(newVal)
      }
    },
    isCountTime(newVal) {
      this.isClick = newVal
      if (newVal) {
        this.setTimer()
      }
    }
  },
  data() {
    return {
      number: '',
      isClick: false,
      time: 60
    }
  },
  computed: {
    buttonText() {
      return this.isClick ? `${this.time}s` : `获取验证码`
    }
  },
  methods: {
    init(data) {
      this.number = data
    },
    onChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    },
    onClick(params) {
      if (this.isClick) return
      this.$emit('click')
    },
    setTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.time <= 1) {
          this.isClick = false
          this.$emit('endCount')
          this.time = 60
          clearInterval(this.timer)
        }
        this.time = --this.time
      }, 1000)
    }
  }
}
</script>
