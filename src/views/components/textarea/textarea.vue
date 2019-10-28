<template>
  <div :class="b()">
    <a-textarea
      :class="b('content')"
      v-bind="attrs"
      v-model="content"
      @change="onChange"
    ></a-textarea>
    <label :class="b('label')">{{ currentLength }}/{{ maxlength }}</label>
    <span :class="b('content-copy')" v-if="suffix">
      {{ content }}
      <span :class="b('content-text')">{{ suffix }}</span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'StTextarea',
  model: {
    prop: 'value',
    event: 'change'
  },
  bem: {
    b: 'st-textarea'
  },
  props: {
    value: {
      type: String
    },
    maxlength: {
      type: [String, Number],
      default: 500
    },
    suffix: {
      type: String
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
      this.content = this.value || ''
    },
    onChange(e) {
      const { maxlength } = this
      const content = e.target.value.substr(0, maxlength)
      this.content = content
      this.$emit('input', content)
      this.$emit('change', content)
    }
  }
}
</script>
