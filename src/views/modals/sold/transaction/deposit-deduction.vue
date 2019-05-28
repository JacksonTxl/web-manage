<template>
  <st-form-item label="定金抵扣" class="global-form-item-text" labelGutter="12px">
    <div style="display: flex; justify-content: space-between;">
      <span>120元</span>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          定金选择
          <a-icon type="right"/>
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value']
}
</script>
