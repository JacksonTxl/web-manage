<template>
  <div :class="b()">
    <a-textarea
      :class="b('content')"
      v-bind="attrs"
      v-on="$listeners"
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
      this.$emit('input', val)
    }
  },
  created() {
    this.content = this.$attrs.value || ''
    console.log('c', this.$attrs, this.attrs)
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
