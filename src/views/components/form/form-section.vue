<template>
  <section class="st-form-section">
    <div class="st-form-section__header">
      <div class="st-form-section__title">{{title}}</div>
    </div>
    <div class="st-form-section__body">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StFormSection',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
