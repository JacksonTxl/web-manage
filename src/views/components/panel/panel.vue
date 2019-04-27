<template>
  <div
    :class="['st-panel',{
        'st-panel--app':app,
        'st-panel--tabs':tabs,
        'st-panel--initial':initial
    }]"
  >
    <div v-if="title || $slots.actions || $slots.title" class="st-panel__header">
      <st-route-tabs v-if="tabs" @change="onChange" :options="tabs">
        <slot name="actions" slot="actions"></slot>
      </st-route-tabs>
      <template v-else>
        <div class="st-panel__title">
          <slot name="title">{{title}}</slot>
        </div>
        <div class="st-panel__actions">
          <slot name="actions"></slot>
        </div>
      </template>
    </div>
    <div v-if="$slots.prepend" class="st-panel__prepend">
      <slot name="prepend"></slot>
    </div>
    <a-spin :spinning="loading">
      <div class="st-panel__body">
        <slot></slot>
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: 'StPanel',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array,
      default: undefined
    },
    app: {
      type: Boolean,
      default: false
    },
    initial: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(key) {
      this.$emit('change', key)
    }
  }
}
</script>
