<template>
  <div :class="b()">
    <a-popover trigger="focus" placement="rightTop" :visible="show">
      <template slot="content">
        <div :class="[b('popover'), validStatusLength]">
          6~15位字符
        </div>
        <div :class="[b('popover'), validStatusType]">
          支持英文、数字，不能输入特殊符号
        </div>
      </template>
      <a-input
        :size="size"
        type="password"
        :class="b('input')"
        :placeholder="placeholder"
        :maxLength="15"
        @change="onChange"
        @focus="onFocus"
        v-bind="$attrs"
      />
    </a-popover>
    <div :class="b('pwd')">
      <div :class="[b('pwd-item'), strengthClassWeak]">弱</div>
      <div :class="[b('pwd-item'), strengthClassMiddle]">中</div>
      <div :class="[b('pwd-item'), strengthClassStrong]">强</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputPwdStrength',
  bem: {
    b: 'input-pwd-strength'
  },
  data() {
    return {
      show: false
    }
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
    validStatus: {
      type: Number,
      default: () => 0 //0  都不满足 1 长度满足 2 数字英文满足 3 都满足
    },
    strength: {
      type: String,
      default: () => '' // 1 weak 2 middle 3 strong
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  computed: {
    validStatusLength() {
      let cla = 'input-pwd-strength__popover--error'
      if (this.validStatus === 1 || this.validStatus === 3) {
        cla = 'input-pwd-strength__popover--success'
      }
      return cla
    },
    validStatusType() {
      let cla = 'input-pwd-strength__popover--error'
      if (this.validStatus === 2 || this.validStatus === 3) {
        cla = 'input-pwd-strength__popover--success'
      }
      return cla
    },
    strengthClassWeak() {
      let cla = ''
      if (this.strength === 'weak') {
        cla = `input-pwd-strength__pwd-item--weak`
      }
      return cla
    },
    strengthClassMiddle() {
      let cla = ''
      if (this.strength === 'middle') {
        cla = `input-pwd-strength__pwd-item--middle`
      }
      return cla
    },
    strengthClassStrong() {
      let cla = ''
      if (this.strength === 'strong') {
        cla = `input-pwd-strength__pwd-item--strong`
      }
      return cla
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.value)
    },
    onFocus(event) {
      this.show = true
    }
  }
}
</script>
