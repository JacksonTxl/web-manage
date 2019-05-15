<template>
  <div :class="b()">
    <a-textarea
      :class="b('content')"
      v-bind="$attrs"
      v-on="$listeners"
      :autosize="{ minRows: 10, maxRow: 20 }"
      v-model="content"
      @change="onChange"
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
      content: ''
    }
  },
  watch: {
    content(val) {
      this.$emit('input', val)
    }
  },
  created() {
    this.content = this.$attrs.value || ''
  },
  computed: {
    currentLength() {
      return this.content.length
    }
  },
  methods: {
    onChange(e) {
      let { value } = e.target
      const { maxlength } = this
      const content = value.substr(0, maxlength)
      this.content = content
    }
  }
}
</script>
