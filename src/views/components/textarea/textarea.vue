<template>
  <div :class="b()">
    <a-textarea
      :class="b('content')"
      v-bind="attrs"
      v-on="$listeners"
      v-model="content"
    >
    </a-textarea>
    <label :class="b('label')">{{currentLength}}/{{maxlength}}</label>
  </div>
</template>
<script>
export default {
  name: 'StTextarea',
  bem: {
    b: 'st-textarea'
  },
  props: {
    maxlength: {
      type: [String, Number],
      default: 500
    }
  },
  data() {
    return {
      content: '',
      attrs: {
        autosize: {
          minRows: 10,
          maxRow: 20
        },
        ...this.$attrs
      }
    }
  },
  watch: {
    content(val) {
      const { maxlength } = this
      const content = val.substr(0, maxlength)
      this.content = content
      this.$emit('input', content)
    }
  },
  created() {
    this.content = this.$attrs.value || ''
  },
  computed: {
    currentLength() {
      return this.content.length
    }
  }
}
</script>
