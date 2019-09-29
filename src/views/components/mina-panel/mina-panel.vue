<template>
  <div :class="bComponent()">
    <div class="item" :class="bComponent('view')">
      <slot name="view"></slot>
    </div>
    <div class="item" :class="bComponent('form')">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StMinaPanel',
  bem: {
    bComponent: 'st-mina-panel'
  }
}
</script>
