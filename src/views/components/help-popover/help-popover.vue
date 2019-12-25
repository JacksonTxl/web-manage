<template>
  <a-popover
    placement="bottomRight"
    arrowPointAtCenter
    :overlayClassName="b()"
    v-bind="$attrs"
    v-on="$listeners"
    :overlayStyle="{ maxWidth }"
  >
    <slot :class="b('title')" slot="title" name="title"></slot>
    <slot :class="b('content')" slot="content" name="content"></slot>
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
