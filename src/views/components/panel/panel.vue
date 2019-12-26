<template>
  <div
    :class="[
      'st-panel',
      {
        'st-panel--app': app,
        'st-panel--tabs': tabs,
        'st-panel--initial': initial,
        'st-panel--app-with-full-height': appWithFullHeight
      }
    ]"
  >
    <div
      v-if="tabs || title || $slots.actions || $slots.title"
      class="st-panel__header"
    >
      <template v-if="tabs">
        <st-route-tabs @change="onChange" :options="tabs"></st-route-tabs>
        <div class="st-panel__actions st-panel__actions--tabs">
          <slot name="actions"></slot>
        </div>
      </template>
      <template v-else>
        <div class="st-panel__title">
          <slot name="title">{{ title }}</slot>
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
    },
    appWithFullHeight: {
      type: Boolean,
      defualt: true
    }
  },
  methods: {
    onChange(key) {
      this.$emit('change', key)
    }
  }
}
</script>
