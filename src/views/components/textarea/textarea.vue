<template>
  <div :class="b()">
    <a-textarea
      :class="b('content')"
      v-bind="attrs"
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
    value: {
      type: String,
      default: ''
    },
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
    value() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  computed: {
    currentLength() {
      return this.content.length
    }
  },
  methods: {
    init() {
      this.content = this.value
    },
    onChange(e) {
      const { maxlength } = this
      const content = e.target.value.substr(0, maxlength)
      this.content = content
      this.$emit('input', content)
      this.$emit('change', e)
    }
  }
}
</script>
