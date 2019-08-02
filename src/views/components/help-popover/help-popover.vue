<template>
  <a-popover
    placement="bottomRight"
    arrowPointAtCenter
    :overlayClassName="b()"
    v-bind="$attrs"
    v-on="$listeners"
    :overlayStyle="{ maxWidth }"
  >
    <div :class="b('title')" slot="title">
      <slot name="title"></slot>
    </div>
    <div :class="b('content')" slot="content">
      <slot name="content"></slot>
    </div>
    <a-icon :class="b('icon')" type="info-circle"></a-icon>
  </a-popover>
</template>

<script>
export default {
  name: 'StHelpPopover',
  props: {
    maxWidth: {
      type: String,
      default: '336px'
    }
  },
  bem: {
    b: 'st-help-popover'
  }
}
</script>
