<template>
  <div :class="['st-panel',{
        'st-panel--app':app,
        'st-panel--tabs':tabs,
        'st-panel--initial':initial
    }]">
    <div v-if="title || $slots.actions || $slots.title"
      class="st-panel__header">
      <st-route-tabs v-if="tabs"
        :options="tabs">
        <slot name="actions"
          slot="actions"></slot>
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
    <div class="st-panel__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StPanel',
  props: {
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
  }
}
</script>
