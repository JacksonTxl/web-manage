<template>
  <div class="st-table-header-section">
    <div class="st-table-header-section__left">
      <slot></slot>
    </div>
    <div class="st-table-header-section__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StTableHeaderSection'
}
</script>
